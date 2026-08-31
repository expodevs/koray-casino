import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { Prisma } from "@prismaClient";
import prisma from "@lib/prisma-client";

export type AuditEntityType = "page" | "slot";
export type AuditAction = "create" | "update" | "delete";

export type AuditChange = {
    path: string;
    before: Prisma.JsonValue;
    after: Prisma.JsonValue;
};

type AuditSnapshot = Record<string, unknown> | null;

type WriteAuditInput = {
    entityType: AuditEntityType;
    entityId: number;
    entityLabel?: string | null;
    action: AuditAction;
    before: AuditSnapshot;
    after: AuditSnapshot;
};

const REDACTED_KEYS = new Set([
    "password",
    "password_hash",
    "token",
    "access_token",
    "refresh_token",
    "secret",
    "client_secret",
]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date);
}

function maybeParseJsonString(value: string): unknown {
    const trimmed = value.trim();

    if (!trimmed || (!trimmed.startsWith("{") && !trimmed.startsWith("["))) {
        return value;
    }

    try {
        return JSON.parse(trimmed);
    } catch {
        return value;
    }
}

function normalizeAuditValue(value: unknown, key = ""): Prisma.JsonValue {
    if (value === undefined) return null;
    if (value === null) return null;

    if (REDACTED_KEYS.has(key.toLowerCase())) {
        return "[REDACTED]";
    }

    if (value instanceof Date) {
        return value.toISOString();
    }

    if (typeof value === "bigint") {
        return value.toString();
    }

    if (typeof value === "string") {
        const parsed = maybeParseJsonString(value);

        if (parsed !== value) {
            return normalizeAuditValue(parsed, key);
        }

        return value;
    }

    if (typeof value === "number" || typeof value === "boolean") {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map((item) => normalizeAuditValue(item)) as Prisma.JsonArray;
    }

    if (isPlainObject(value)) {
        const result: Prisma.JsonObject = {};

        for (const [childKey, childValue] of Object.entries(value)) {
            result[childKey] = normalizeAuditValue(childValue, childKey);
        }

        return result;
    }

    return String(value);
}

function isJsonObject(value: Prisma.JsonValue): value is Prisma.JsonObject {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function valuesEqual(a: Prisma.JsonValue, b: Prisma.JsonValue): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

function joinPath(base: string, key: string | number, isArray = false): string {
    if (isArray) {
        return `${base}[${key}]`;
    }

    return base ? `${base}.${key}` : String(key);
}

export function buildAuditChanges(before: unknown, after: unknown): AuditChange[] {
    const normalizedBefore = normalizeAuditValue(before);
    const normalizedAfter = normalizeAuditValue(after);
    const changes: AuditChange[] = [];

    const walk = (left: Prisma.JsonValue, right: Prisma.JsonValue, path: string) => {
        if (valuesEqual(left, right)) {
            return;
        }

        if (Array.isArray(left) && Array.isArray(right)) {
            const maxLength = Math.max(left.length, right.length);

            for (let index = 0; index < maxLength; index += 1) {
                walk(
                    index < left.length ? left[index] : null,
                    index < right.length ? right[index] : null,
                    joinPath(path, index, true),
                );
            }

            return;
        }

        if (isJsonObject(left) && isJsonObject(right)) {
            const keys = new Set([...Object.keys(left), ...Object.keys(right)]);

            for (const childKey of [...keys].sort()) {
                walk(
                    left[childKey] ?? null,
                    right[childKey] ?? null,
                    joinPath(path, childKey),
                );
            }

            return;
        }

        changes.push({
            path: path || "$",
            before: left,
            after: right,
        });
    };

    walk(normalizedBefore, normalizedAfter, "");

    return changes;
}

async function getActor(req: NextRequest) {
    const token = await getToken({ req });
    const tokenData = (token || {}) as Record<string, unknown>;
    const rawId = tokenData.id ?? tokenData.user_id ?? tokenData.sub;
    const parsedId = typeof rawId === "number" ? rawId : Number(rawId);

    return {
        userId: Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null,
        userName: typeof tokenData.name === "string" ? tokenData.name : null,
        userEmail: typeof tokenData.email === "string" ? tokenData.email : null,
    };
}

function getIpAddress(req: NextRequest): string | null {
    const forwarded = req.headers.get("x-forwarded-for");

    if (forwarded) {
        return forwarded.split(",")[0]?.trim() || null;
    }

    return req.headers.get("x-real-ip");
}

export async function writeAdminAuditLog(req: NextRequest, input: WriteAuditInput) {
    try {
        const changes = buildAuditChanges(input.before, input.after);

        if (input.action === "update" && changes.length === 0) {
            return null;
        }

        const actor = await getActor(req);

        return await prisma.adminAuditLog.create({
            data: {
                user_id: actor.userId,
                user_name: actor.userName,
                user_email: actor.userEmail,
                entity_type: input.entityType,
                entity_id: input.entityId,
                entity_label: input.entityLabel || null,
                action: input.action,
                changes: changes as Prisma.InputJsonValue,
                ip_address: getIpAddress(req),
                user_agent: req.headers.get("user-agent")?.slice(0, 500) || null,
            },
        });
    } catch (error) {
        // The content change has already been saved by this point.
        // Do not turn a successful admin edit into a 500 just because audit persistence failed.
        console.error("Admin audit log write failed:", error);
        return null;
    }
}

export async function getPageAuditSnapshot(id: number): Promise<AuditSnapshot> {
    const page = await prisma.page.findUnique({
        where: { id },
        include: {
            builds: {
                orderBy: {
                    position: "asc",
                },
            },
        },
    });

    if (!page) {
        return null;
    }

    const {
        builds,
        created_at: _createdAt,
        updated_at: _updatedAt,
        ...pageData
    } = page as typeof page & {
        created_at?: Date;
        updated_at?: Date;
    };

    void _createdAt;
    void _updatedAt;

    return {
        ...pageData,
        builds: builds.map((build) => ({
            build_id: build.build_id,
            position: build.position,
            field_values: build.field_values,
        })),
    };
}

export async function getCardAuditSnapshot(id: number): Promise<AuditSnapshot> {
    const card = await prisma.card.findUnique({
        where: { id },
        include: {
            options: true,
            icon_card_images: true,
            faqs: true,
            images: true,
        },
    });

    if (!card) {
        return null;
    }

    const {
        options,
        icon_card_images: iconCardImages,
        faqs,
        images,
        created_at: _createdAt,
        updated_at: _updatedAt,
        ...cardData
    } = card as typeof card & {
        created_at?: Date;
        updated_at?: Date;
    };

    void _createdAt;
    void _updatedAt;

    return {
        ...cardData,
        options: [...options]
            .map((option) => ({
                option_id: option.option_id,
                value: option.value,
            }))
            .sort((a, b) => a.option_id - b.option_id),
        icon_card_images: [...iconCardImages]
            .map((image) => ({
                icon_card_image_id: image.icon_card_image_id,
            }))
            .sort((a, b) => a.icon_card_image_id - b.icon_card_image_id),
        faqs: [...faqs]
            .map((faq) => ({
                faq_id: faq.faq_id,
                position: faq.position,
            }))
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0) || a.faq_id - b.faq_id),
        images: [...images]
            .map((image) => ({
                src: image.src,
                alt: image.alt,
                position: image.position,
            }))
            .sort((a, b) => a.position - b.position),
    };
}
