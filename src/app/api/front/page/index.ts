import prisma from "@lib/prisma-client";

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
        const type = bp.build.build_type;
        let props: any;

        switch (type) {
            case "text":
            case "textarea":
            case "htmlEditor":
                props = safeParseJSON(bp.field_values);
                break;

            case "faq":
                props = await loadFaqBlock(bp.field_values);
                break;

            case "slotCard":
            case "casinoCard":
            case "cart":
                props = await loadCardBlock(bp.field_values);
                break;

            case "casinoTop":
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
    try { data = JSON.parse(raw); } catch {}
    const categoryId = Number(data.category_id ?? data.categoryCardId);

    return prisma.card.findMany({
        where: { category_card_id: categoryId, published: true },
        orderBy: { position: "asc" },
        select: {
            id: true,
            type: true,
            label: true,
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
                    id:    true,
                    value: true,
                    entity: {
                        select: {
                            id:             true,
                            published:      true,
                            use_for_filter: true,
                            input_type:     true,
                            type:           true,
                            label:          true,
                            tooltip:        true,
                            hash_tag:       true,
                            value:          true,
                            position:       true,
                        },
                    },
                },
            },
            icon_card_images: {
                orderBy: { id: "asc" },
                select: { icon_card_image_id: true },
            },
        },
    });
}

async function loadCasinoTopBlock(raw: string) {
    let data: any = {};
    try { data = JSON.parse(raw); } catch {}
    const limit = data.limit ?? 10;
    return prisma.casino.findMany({
        where: { published: true },
        orderBy: { name: "asc" },
        take: limit,
        select: {
            id: true,
            name: true,
            tooltip: true,
            image: true,
            referral_key: true,
            referral_link: true,
        },
    });
}
