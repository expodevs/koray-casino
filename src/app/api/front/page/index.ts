import prisma from "@lib/prisma-client";
import { BuildType, CardType } from "@prismaClient";

// =============================================================================
// Type Definitions
// =============================================================================

/**
 * Metadata for a page
 */
export interface PageMeta {
    title: string;
    description: string;
    keywords: string[];
    noIndex: boolean;
}

/**
 * A block within a page
 */
export interface Block {
    id: number;
    type: string;
    position: number;
    props: BlockProps;
}

/**
 * Union type for all possible block properties
 */
export type BlockProps = 
    | SimpleBlockProps 
    | FaqBlockProps 
    | CardBlockProps 
    | CartListBlockProps
    | CasinoTopBlockProps

/**
 * Properties for simple blocks (text, textarea, htmlEditor)
 */
export interface SimpleBlockProps {
    html?: string;
}

/**
 * Properties for FAQ blocks
 */
export type FaqBlockProps = FaqItem[];

/**
 * A single FAQ item
 */
export interface FaqItem {
    id: number;
    position: number;
    question: string;
    answer: string;
}

/**
 * Properties for card blocks
 */
export interface CardBlockProps {
    label: string;
    description: string;
    last_update: string;
    ad_disclosure: string;
    show_filter: boolean;
    type: string;
    options: PositionedItem[];
    iconCardItems: PositionedItem[];
    cards: CardItem[];
}

/**
 * A single card item
 */
export interface CardItem {
    id: number;
    type: string;
    label: string;
    description: string;
    referral_key: string | null;
    referral_btn_1_link: string | null;
    referral_btn_2_link: string | null;
    casino_image: string | null;
    good_selection_of_games: boolean | null;
    no_game_provider_filter: boolean | null;
    live_chat_available_only_after_registration: boolean | null;
    terms_and_condition: string | null;
    position: number;
    images: CardImage[];
    options: CardOption[];
    faqs: CardFaq[];
    icons: Record<string, CardIconGroup>;
}

/**
 * An image for a card
 */
export interface CardImage {
    id: number;
    src: string;
    alt: string | null;
    position: number;
}

/**
 * An option for a card
 */
export interface CardOption {
    value: string | null;
    entity: {
        id: number;
        input_type: string;
        label: string;
        tooltip: string | null;
        hash_tag: string | null;
        value: string | null;
        use_for_filter: boolean;
        position: number;
    };
}

/**
 * A FAQ for a card
 */
export interface CardFaq {
    id: number;
    question: string;
    answer: string;
    position: number;
}

/**
 * A group of icons for a card
 */
export interface CardIconGroup {
    label: string;
    items: CardIconItem[];
}

/**
 * An icon item for a card
 */
export interface CardIconItem {
    id: number;
    src: string;
    label?: string;
    alt?: string;
    position?: number;
}

/**
 * Properties for casino top blocks
 */
export interface CasinoTopBlockProps {
    table_show_options: CasinoTopOption[];
    table_show_casinos: PositionedItem[];
    casinos: unknown[];
}

/**
 * A page with its blocks
 */
export interface PageWithBlocks {
    id: number;
    slug: string;
    label: string;
    meta: PageMeta;
    blocks: Block[];
}

/**
 * Common interface for items with position
 */
interface PositionedItem {
    id: number;
    position: number;
}

// =============================================================================
// Raw Data Interfaces (for parsing)
// =============================================================================

/**
 * Raw data for a FAQ item
 */
interface FaqItemRaw {
    id: string;
    position: number;
}

/**
 * Raw data for a card block
 */
interface CardBlockDataRaw {
    label?: string;
    description?: string;
    last_update?: string;
    ad_disclosure?: string;
    show_filter?: boolean;
    type?: string;
    options?: string | PositionedItem[];
    iconCardItems?: string | PositionedItem[];
    category_id?: number;
    source?: 'category' | 'manual';
    card_ids?: Array<number | string>;
}

/**
 * A casino top option
 */
interface CasinoTopOption extends PositionedItem {
    static_field: string;
}

/**
 * Raw data for a card from database
 */
interface RawCardData {
    id: number;
    type: string;
    label: string;
    description: string;
    referral_key: string | null;
    referral_btn_1_link: string | null;
    referral_btn_2_link: string | null;
    casino_image: string | null;
    good_selection_of_games: boolean | null;
    no_game_provider_filter: boolean | null;
    live_chat_available_only_after_registration: boolean | null;
    terms_and_condition: string | null;
    position: number;
    images: CardImage[];
    options: CardOption[];
    faqs: RawCardFaq[];
    icon_card_images: RawIconCardImage[];
}

/**
 * Cart list item (cart)
 */
interface CartListItem {
    id: number
    title: string
    description: string | null
    link: string | null
}

/**
 * Props for CartList
 */
interface CartListBlockProps {
    items: CartListItem[]
}

/**
 * Raw data for a FAQ in a card
 */
interface RawCardFaq {
    position: number;
    faq: {
        id: number;
        question: string;
        answer: string;
    };
}

/**
 * Raw data for an icon card image
 */
interface RawIconCardImage {
    icon_card_image: {
        id: number;
        image: string;
        alt: string | null;
        label: string | null;
        position: number | null;
        icon_card: {
            label: string;
        };
    };
}

interface BtnBlockProps extends SimpleBlockProps {
    buttons: { position: number; label: string; link: string }[];
    type?: string;
}

// =============================================================================
// Public API Functions
// =============================================================================

/**
 * Get all page slugs from the database
 * @returns Array of page slugs
 */
export async function getAllPageSlugs(): Promise<string[]> {
    const pages = await prisma.page.findMany({ select: { slug: true } });
    return pages.map((p) => p.slug);
}

/**
 * Get a page with its blocks by slug
 * @param slug The page slug
 * @returns The page with its blocks, or null if not found
 */
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
        const props = await processBlockByType(type, bp.field_values);

        blocks.push({
            id: bp.id,
            type,
            position: bp.position,
            props,
        });
    }

    return {
        id: page.id,
        slug: page.slug,
        label: page.label,
        meta,
        blocks,
    };
}

// =============================================================================
// Block Processing Functions
// =============================================================================

/**
 * Process a block based on its type
 * @param type The block type
 * @param fieldValues The raw field values
 * @returns The processed block properties
 */
async function processBlockByType(
    type: BuildType, 
    fieldValues: string
): Promise<BlockProps> {
    switch (type) {
        case BuildType.text:
        case BuildType.textarea:
        case BuildType.htmlEditor:
            return processSimpleBlock(fieldValues);

        case BuildType.faq:
            return await processFaqBlock(fieldValues);

        case BuildType.slotCard:
        case BuildType.casinoCard:
            return await processCardBlock(fieldValues);

        case BuildType.cart:
            return await processCartBlock();

        case BuildType.casinoTop:
            return await processCasinoTopBlock(fieldValues);

        case BuildType.btnBlock:
            return processBtnBlock(fieldValues);

        default:
            return processSimpleBlock(fieldValues);
    }
}

/**
 * Process a simple block (text, textarea, htmlEditor)
 * @param fieldValues The raw field values
 * @returns The processed block properties
 */
function processSimpleBlock(fieldValues: string): SimpleBlockProps {
    return { html: fieldValues };
}

/**
 * Process a FAQ block
 * @param fieldValues The raw field values
 * @returns The processed block properties
 */
async function processFaqBlock(fieldValues: string): Promise<FaqBlockProps> {
    const items = safeParseJSON<FaqItemRaw[]>(fieldValues, []);

    const parsed = items
        .map((i) => ({ id: +i.id, position: i.position }))
        .sort((a, b) => a.position - b.position);

    const faqs = await prisma.faq.findMany({
        where: { 
            id: { in: parsed.map((i) => i.id) }, 
            published: true 
        },
        orderBy: { position: "asc" },
        select: { 
            id: true, 
            position: true, 
            question: true, 
            answer: true 
        },
    });

    const map = new Map(faqs.map((f) => [f.id, f]));

    return parsed
        .filter((i) => map.has(i.id))
        .map((i) => ({ 
            ...map.get(i.id)!, 
            position: i.position 
        }));
}

/**
 * Process a card block
 * @param fieldValues The raw field values
 * @returns The processed block properties
 */
async function processCardBlock(fieldValues: string): Promise<CardBlockProps> {
    const data = safeParseJSON<CardBlockDataRaw>(fieldValues, {});

    const label = String(data.label ?? "");
    const description = String(data.description ?? "");
    const last_update = String(data.last_update ?? "");
    const ad_disclosure = String(data.ad_disclosure ?? "");
    const show_filter = Boolean(data.show_filter);
    const slotType = String(data.type ?? "");

    const parsedOptions = parsePositionedItems(data.options);

    const parsedIconItems = parsePositionedItems(data.iconCardItems);

    const source = (data.source === 'manual' || data.source === 'category') ? data.source : 'category';

    let cardsRaw: RawCardData[] = [];

    if (source === 'manual') {
        const ids = (Array.isArray(data.card_ids) ? data.card_ids : [])
            .map((x) => Number(x))
            .filter((x) => Number.isFinite(x) && x > 0);

        cardsRaw = await fetchCardsByIds(ids);
    } else {
        const categoryId = Number(data.category_id ?? 0);
        cardsRaw = await fetchCardsFromDatabase(categoryId);
    }

    const cards = processCards(cardsRaw);

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

/**
 * Process a buttons block
 * @param fieldValues The raw field values
 * @returns The processed block properties
 */
function processBtnBlock(fieldValues: string): BtnBlockProps {
    let parsed: { buttons?: Array<{ position: number; label: string; link: string }>; type?: string } = {};
    try {
        parsed = JSON.parse(fieldValues);
    } catch (e) {
        console.error("Failed to parse btnBlock JSON:", e);
        parsed = {};
    }

    return {
        buttons: Array.isArray(parsed.buttons) ? parsed.buttons : [],
        type: parsed.type ?? undefined,
    };
}

/**
 * Parse positioned items from string or array
 * @param items The items to parse
 * @returns The parsed positioned items
 */
function parsePositionedItems(
    items?: string | PositionedItem[]
): PositionedItem[] {
    let itemsConfig: PositionedItem[] = [];

    if (typeof items === "string") {
        itemsConfig = safeParseJSON<PositionedItem[]>(items, []);
    } else if (Array.isArray(items)) {
        itemsConfig = items;
    }

    return itemsConfig
        .map((item) => ({ 
            id: Number(item.id), 
            position: item.position 
        }))
        .sort((a, b) => a.position - b.position);
}

/**
 * Fetch cards from database
 * @param categoryId The category ID
 * @returns The raw cards data
 */
async function fetchCardsFromDatabase(categoryId: number): Promise<RawCardData[]> {
    return (await prisma.card.findMany({
        where: {
            category_card_id: categoryId,
            published: true,
        },
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
                    value: true,
                    entity: {
                        select: {
                            id: true,
                            input_type: true,
                            label: true,
                            tooltip: true,
                            hash_tag: true,
                            use_for_filter: true,
                            value: true,
                            position: true,
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
                            id: true,
                            question: true,
                            answer: true,
                        },
                    }
                },
            },
            icon_card_images: {
                include: {
                    icon_card_image: {
                        select: {
                            id: true,
                            image: true,
                            alt: true,
                            label: true,
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
    })) as RawCardData[];
}

/**
 * Fetch cards by explicit IDs (manual selection)
 * Preserves the order of the ids array
 */
async function fetchCardsByIds(ids: number[]): Promise<RawCardData[]> {
    if (!ids.length) return [];

    const rows = (await prisma.card.findMany({
        where: {
            id: { in: ids },
            published: true,
        },
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
                orderBy: { position: 'asc' },
                select: { id: true, src: true, alt: true, position: true },
            },
            options: {
                orderBy: { id: 'asc' },
                where: { entity: { published: true } },
                select: {
                    value: true,
                    entity: {
                        select: {
                            id: true,
                            input_type: true,
                            label: true,
                            tooltip: true,
                            hash_tag: true,
                            use_for_filter: true,
                            value: true,
                            position: true,
                        },
                    },
                },
            },
            faqs: {
                orderBy: { position: 'asc' },
                select: {
                    position: true,
                    faq: {
                        select: {
                            id: true,
                            question: true,
                            answer: true,
                        },
                    }
                },
            },
            icon_card_images: {
                include: {
                    icon_card_image: {
                        select: {
                            id: true,
                            image: true,
                            alt: true,
                            label: true,
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
                        position: 'asc'
                    }
                }
            },
        },
    })) as RawCardData[];

    const pos = new Map(ids.map((id, i) => [id, i]));
    rows.sort((a, b) => (pos.get(a.id) ?? 1e9) - (pos.get(b.id) ?? 1e9));
    return rows;
}

/**
 * Process cards data
 * @param cardsRaw The raw cards data
 * @returns The processed cards
 */
function processCards(cardsRaw: RawCardData[]): CardItem[] {
    return cardsRaw.map((c) => {
        const iconsByGroup = processCardIcons(c.icon_card_images);

        const faqs = c.faqs.map((x: RawCardFaq) => ({
            id: x.faq.id,
            question: x.faq.question,
            answer: x.faq.answer,
            position: x.position,
        }));

        return {
            id: c.id,
            type: c.type,
            label: c.label,
            description: c.description,
            referral_key: c.referral_key,
            referral_btn_1_link: c.referral_btn_1_link,
            referral_btn_2_link: c.referral_btn_2_link,
            casino_image: c.casino_image,
            good_selection_of_games: c.good_selection_of_games,
            no_game_provider_filter: c.no_game_provider_filter,
            live_chat_available_only_after_registration: c.live_chat_available_only_after_registration,
            terms_and_condition: c.terms_and_condition,
            position: c.position,
            images: c.images,
            options: c.options,
            faqs,
            icons: iconsByGroup,
        };
    });
}

/**
 * Process card icons
 * @param iconCardImages The raw icon card images
 * @returns The processed icons by group
 */
function processCardIcons(iconCardImages: RawIconCardImage[]): Record<string, CardIconGroup> {
    const iconsByGroup: Record<string, CardIconGroup> = {};

    for (const rel of iconCardImages) {
        const ico = rel.icon_card_image;
        const groupLabel: string = ico.icon_card.label;
        const groupKey = groupLabel
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "_");

        if (!iconsByGroup[groupKey]) {
            iconsByGroup[groupKey] = { label: groupLabel, items: [] };
        }

        iconsByGroup[groupKey].items.push({
            id: ico.id,
            src: ico.image,
            label: ico.label || undefined,
            alt: ico.alt || undefined,
            position: ico.position ?? undefined,
        });
    }

    return iconsByGroup;
}

async function processCartBlock(): Promise<CartListBlockProps> {
    const cards = await prisma.card.findMany({
        where: {
            type: CardType.cart,
            published: true,
        },
        select: {
            id: true,
            label: true,
            description: true,
            referral_btn_1_link: true,
        },
        orderBy: { position: "asc" },
    })

    return {
        items: cards.map(c => ({
            id:          c.id,
            title:       c.label,
            description: c.description,
            link:        c.referral_btn_1_link,
        }))
    }
}
/**
 * Process a casino top block
 * @param fieldValues The raw field values
 * @returns The processed block properties
 */

function formatStaticLabel(field: string): string {
    return field
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}

export async function processCasinoTopBlock(
    fieldValues: string
): Promise<{
    table_show_options: Array<{
        id: number
        position: number
        static_field: string
        label: string
        tooltip: string | null
    }>
    table_show_casinos: Array<{ id: number; position: number }>
    casinos: Array<{ id: number; cells: Array<string|number|null> }>
}> {
    const data = safeParseJSON<{
        table_show_options?: Array<{ id: number; position: number; static_field?: string }>
        table_show_casinos?:  Array<{ id: number; position: number }>
    }>(fieldValues, {})

    const showOptions = (data.table_show_options || []).map(o => ({
        id:           Number(o.id),
        position:     Number(o.position),
        static_field: o.static_field || "",
    }))

    const table_show_casinos = (data.table_show_casinos || [])
        .map(c => ({ id: Number(c.id), position: Number(c.position) }))
        .sort((a, b) => a.position - b.position)

    const rawCasinos = await prisma.casino.findMany({
        where: {
            id: { in: table_show_casinos.map(x => x.id) },
            published: true,
        },
        include: {
            options: { include: { entity: true } }
        }
    })

    const dynamicIds = showOptions.filter(o => !o.static_field).map(o => o.id)
    const dynamicMeta = dynamicIds.length
        ? await prisma.option.findMany({
            where:   { id: { in: dynamicIds } },
            select:  { id: true, label: true, tooltip: true }
        })
        : []

    const table_show_options = showOptions
        .map(o => {
            if (o.static_field) {
                return {
                    ...o,
                    label: formatStaticLabel(o.static_field),
                    tooltip: null
                }
            } else {
                const meta = dynamicMeta.find(m => m.id === o.id)
                return {
                    ...o,
                    label:   meta?.label   ?? `Option ${o.id}`,
                    tooltip: meta?.tooltip ?? null
                }
            }
        })
        .sort((a,b) => a.position - b.position)

    const sortedCasinos = table_show_casinos
        .map(cfg => rawCasinos.find(c => c.id === cfg.id))
        .filter((c): c is typeof rawCasinos[0] => Boolean(c))

    const casinos = sortedCasinos.map((casino, idx) => ({
        id: casino.id,
        cells: table_show_options.map(col => {
            if (col.static_field) {
                switch (col.static_field) {
                    case "rank":     return idx + 1
                    case "name":     return casino.name
                    case "btn_play": return casino.referral_key ?? null
                }
            }
            const rel = casino.options.find(o => o.entity.id === col.id)
            if (!rel) return null
            const v = rel.value?.trim()
            return v ? v : rel.entity.value
        })
    }))

    return {
        table_show_options,
        table_show_casinos,
        casinos,
    }
}


// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Safely parses JSON string with proper error handling
 * @param raw JSON string to parse
 * @param defaultValue Default value to return if parsing fails
 * @returns Parsed object or default value
 */
function safeParseJSON<T>(raw: string, defaultValue: T): T {
    try {
        if (!raw || raw.trim() === '') {
            return defaultValue;
        }

        return JSON.parse(raw) as T;
    } catch (error) {
        console.error("JSON parsing error:", error);
        return defaultValue;
    }
}
