import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prismaClient";
import prisma from "@lib/prisma-client";
import { withAdminAuthorized } from "@lib/authorized";

const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 100;

function positiveInt(value: string | null, fallback: number): number {
    const parsed = Number(value);

    if (!Number.isInteger(parsed) || parsed < 1) {
        return fallback;
    }

    return parsed;
}

function parseDateStart(value: string | null): Date | undefined {
    if (!value) return undefined;

    const date = new Date(`${value}T00:00:00.000Z`);

    return Number.isNaN(date.getTime()) ? undefined : date;
}

function parseDateEnd(value: string | null): Date | undefined {
    if (!value) return undefined;

    const date = new Date(`${value}T23:59:59.999Z`);

    return Number.isNaN(date.getTime()) ? undefined : date;
}

export async function GET(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {
            const params = req.nextUrl.searchParams;
            const page = positiveInt(params.get("page"), 1);
            const limit = Math.min(positiveInt(params.get("limit"), DEFAULT_LIMIT), MAX_LIMIT);
            const entityType = params.get("entity_type");
            const action = params.get("action");
            const admin = params.get("admin")?.trim();
            const query = params.get("q")?.trim();
            const from = parseDateStart(params.get("from"));
            const to = parseDateEnd(params.get("to"));

            const and: Prisma.AdminAuditLogWhereInput[] = [];

            if (entityType === "page" || entityType === "slot") {
                and.push({ entity_type: entityType });
            }

            if (action === "create" || action === "update" || action === "delete") {
                and.push({ action });
            }

            if (admin) {
                and.push({
                    OR: [
                        { user_name: { contains: admin } },
                        { user_email: { contains: admin } },
                    ],
                });
            }

            if (query) {
                const numericId = Number(query);
                const or: Prisma.AdminAuditLogWhereInput[] = [
                    { entity_label: { contains: query } },
                    { user_name: { contains: query } },
                    { user_email: { contains: query } },
                ];

                if (Number.isInteger(numericId) && numericId > 0) {
                    or.push({ entity_id: numericId });
                }

                and.push({ OR: or });
            }

            if (from || to) {
                and.push({
                    created_at: {
                        ...(from ? { gte: from } : {}),
                        ...(to ? { lte: to } : {}),
                    },
                });
            }

            const where: Prisma.AdminAuditLogWhereInput = and.length ? { AND: and } : {};

            const [items, total] = await prisma.$transaction([
                prisma.adminAuditLog.findMany({
                    where,
                    orderBy: {
                        created_at: "desc",
                    },
                    skip: (page - 1) * limit,
                    take: limit,
                }),
                prisma.adminAuditLog.count({ where }),
            ]);

            return NextResponse.json({
                items,
                total,
                page,
                limit,
                pages: Math.max(1, Math.ceil(total / limit)),
            });
        } catch (error) {
            console.error("Audit logs GET error:", error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    }, req);
}
