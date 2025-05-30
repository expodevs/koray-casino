import prisma from "@lib/prisma-client";
import { BuildType } from "@prismaClient";

export interface PageMeta {
    title: string;
    description: string;
    keywords: string[];
    noIndex: boolean;
}

export interface Block {
    id: number;
    type: string;
    position: number;
    props: any;
}

export interface PageWithBlocks {
    id: number;
    slug: string;
    label: string;
    meta: PageMeta;
    blocks: Block[];
}

export async function getAllPageSlugs(): Promise<string[]> {
    const pages = await prisma.page.findMany({ select: { slug: true } });
    return pages.map((p) => p.slug);
}

export async function getPageWithBlocks(
    slug: string
): Promise<PageWithBlocks | null> {
    const page = await prisma.page.findUnique({
        where: { slug },
        select: {
            id: true,
            slug: true,
            label: true,
            meta_title: true,
            meta_description: true,
            meta_keywords: true,
            meta_noindex_nofollow: true,
            builds: {
                orderBy: { position: "asc" },
                select: {
                    id: true,
                    position: true,
                    field_values: true,
                    build: { select: { build_type: true } },
                },
            },
        },
    });
    if (!page) return null;

    const meta: PageMeta = {
        title: page.meta_title,
        description: page.meta_description,
        keywords: page.meta_keywords
            ? page.meta_keywords.split(",").map((s) => s.trim())
            : [],
        noIndex: page.meta_noindex_nofollow,
    };

    const blocks: Block[] = [];
    for (const bp of page.builds) {
        const type = bp.build.build_type as BuildType;
        let props: any;

        switch (type) {
            case BuildType.text:
            case BuildType.textarea:
            case BuildType.htmlEditor:
                props = safeParseJSON(bp.field_values);
                break;

            case BuildType.faq:
                props = await loadFaqBlock(bp.field_values);
                break;

            case BuildType.slotCard:
            case BuildType.casinoCard:
            case BuildType.cart:
                props = await loadCardBlock(bp.field_values);
                break;

            case BuildType.casinoTop:
                props = await loadCasinoTopBlock(bp.field_values);
                break;

            default:
                props = safeParseJSON(bp.field_values);
        }

        blocks.push({
            id: bp.id,
            type,
            position: bp.position,
            props,
        });
    }

    return {
        id:    page.id,
        slug:  page.slug,
        label: page.label,
        meta,
        blocks,
    };
}

function safeParseJSON(raw: string) {
    try {
        return JSON.parse(raw);
    } catch {
        return { html: raw };
    }
}

async function loadFaqBlock(raw: string) {
    let items: Array<{ id: string; position: number }> = [];
    try { items = JSON.parse(raw); } catch {}
    const parsed = items
        .map((i) => ({ id: +i.id, position: i.position }))
        .sort((a, b) => a.position - b.position);

    const faqs = await prisma.faq.findMany({
        where: { id: { in: parsed.map((i) => i.id) }, published: true },
        orderBy: { position: "asc" },
        select: { id: true, position: true, question: true, answer: true },
    });
    const map = new Map(faqs.map((f) => [f.id, f]));
    return parsed
        .filter((i) => map.has(i.id))
        .map((i) => ({ ...map.get(i.id)!, position: i.position }));
}

async function loadCardBlock(raw: string) {
    let data: any = {};
    try {
        data = JSON.parse(raw);
    } catch {
        data = {};
    }

    const label         = String(data.label ?? "");
    const description   = String(data.description ?? "");
    const last_update   = String(data.last_update ?? "");
    const ad_disclosure = String(data.ad_disclosure ?? "");
    const show_filter   = Boolean(data.show_filter);
    const slotType      = String(data.type ?? "");

    let optionsConfig: Array<{ id: number; position: number }> = [];
    if (typeof data.options === "string") {
        try {
            optionsConfig = JSON.parse(data.options);
        } catch {}
    } else if (Array.isArray(data.options)) {
        optionsConfig = data.options;
    }
    const parsedOptions = optionsConfig
        .map((o) => ({ id: Number(o.id), position: o.position }))
        .sort((a, b) => a.position - b.position);

    let iconItemsConfig: Array<{ id: number; position: number }> = [];
    if (typeof data.iconCardItems === "string") {
        try {
            iconItemsConfig = JSON.parse(data.iconCardItems);
        } catch {}
    } else if (Array.isArray(data.iconCardItems)) {
        iconItemsConfig = data.iconCardItems;
    }
    const parsedIconItems = iconItemsConfig
        .map((i) => ({ id: Number(i.id), position: i.position }))
        .sort((a, b) => a.position - b.position);

    const categoryId = Number(data.category_id);
    const cardsRaw = await prisma.card.findMany({
        where: {
            category_card_id: categoryId,
            published: true,
        },
        orderBy: { position: "asc" },
        select: {
            id:     true,
            type:   true,
            label:  true,
            description: true,
            referral_key: true,
            referral_btn_1_link: true,
            referral_btn_2_link: true,
            casino_image: true,
            good_selection_of_games: true,
            no_game_provider_filter: true,
            live_chat_available_only_after_registration: true,
            terms_and_condition: true,
            position: true,
            images: {
                orderBy: { position: "asc" },
                select: { id: true, src: true, alt: true, position: true },
            },
            options: {
                orderBy: { id: "asc" },
                where: { entity: { published: true } },
                select: {
                    value: true,
                    entity: {
                        select: {
                            id:             true,
                            input_type:     true,
                            label:          true,
                            tooltip:        true,
                            hash_tag:       true,
                            value:          true,
                            position:       true,
                        },
                    },
                },
            },

            faqs: {
                orderBy: { position: "asc" },
                select: {
                    position: true,
                    faq: {
                        select: {
                            id:       true,
                            question: true,
                            answer:   true,
                        },
                    }
                },
            },
            icon_card_images: {
                include: {
                    icon_card_image: {
                        select: {
                            id:       true,
                            image:    true,
                            alt:      true,
                            position: true,
                            icon_card: {
                                select: {
                                    label: true,
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    icon_card_image: {
                        position: "asc"
                    }
                }
            },
        },
    });

    const cards = cardsRaw.map((c) => {
        const iconsByGroup: Record<
            string,
            { label: string; items: Array<{ id: number; src: string; alt?: string; position?: number }> }
        > = {};

        for (const rel of c.icon_card_images) {
            const ico = rel.icon_card_image;
            const groupLabel: string = ico.icon_card.label;
            const groupKey = groupLabel
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, "_")
            ;

            if (!iconsByGroup[groupKey]) {
                iconsByGroup[groupKey] = { label: groupLabel, items: [] };
            }

            iconsByGroup[groupKey].items.push({
                id:       ico.id,
                src:      ico.image,
                alt:      ico.alt || undefined,
                position: ico.position ?? undefined,
            });
        }

        const faqs = c.faqs.map((x) => ({
            id:       x.faq.id,
            question: x.faq.question,
            answer:   x.faq.answer,
            position: x.position,
        }));

        return {
            id:          c.id,
            type:        c.type,
            label:       c.label,
            description: c.description,
            referral_key: c.referral_key,
            referral_btn_1_link: c.referral_btn_1_link,
            referral_btn_2_link: c.referral_btn_2_link,
            casino_image: c.casino_image,
            good_selection_of_games: c.good_selection_of_games,
            no_game_provider_filter: c.no_game_provider_filter,
            live_chat_available_only_after_registration: c.live_chat_available_only_after_registration,
            terms_and_condition: c.terms_and_condition,
            position:    c.position,
            images:      c.images,
            options:     c.options,
            faqs,
            icons:       iconsByGroup,
        };
    });

    return {
        label,
        description,
        last_update,
        ad_disclosure,
        show_filter,
        type: slotType,
        options: parsedOptions,
        iconCardItems: parsedIconItems,
        cards,
    };
}

async function loadCasinoTopBlock(raw: string) {
    let data: any = {};
    try {
        data = JSON.parse(raw);
    } catch {
        data = {};
    }

    const showOptions: Array<{ id: number; position: number; static_field: string }> =
        Array.isArray(data.table_show_options)
            ? data.table_show_options.map((o: any) => ({
                id: Number(o.id),
                position: Number(o.position),
                static_field: String(o.static_field ?? ""),
            }))
            : [];

    const showCasinosConfig: Array<{ id: number; position: number }> =
        Array.isArray(data.table_show_casinos)
            ? data.table_show_casinos.map((c: any) => ({
                id: Number(c.id),
                position: Number(c.position),
            }))
            : [];

    const casinos = await prisma.casino.findMany({
        where: {
            id: { in: showCasinosConfig.map((c) => c.id) },
            published: true,
        },
    });

    return {
        table_show_options: showOptions.sort((a, b) => a.position - b.position),
        table_show_casinos: showCasinosConfig.sort((a, b) => a.position - b.position),
        casinos,
    };
}

