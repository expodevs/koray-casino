import prisma from "@lib/prisma-client";
import { BuildType } from "@prismaClient";

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
    | CasinoTopBlockProps;

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
}

/**
 * Raw data for a casino top option
 */
interface CasinoTopOptionRaw {
    id: number | string;
    position: number | string;
    static_field?: string;
}

/**
 * A casino top option
 */
interface CasinoTopOption extends PositionedItem {
    static_field: string;
}

/**
 * Raw data for a casino top block
 */
interface CasinoTopDataRaw {
    table_show_options?: CasinoTopOptionRaw[];
    table_show_casinos?: (PositionedItem | Record<string, unknown>)[];
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
        case BuildType.cart:
            return await processCardBlock(fieldValues);

        case BuildType.casinoTop:
            return await processCasinoTopBlock(fieldValues);

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

    const categoryId = Number(data.category_id ?? 0);

    const cardsRaw = await fetchCardsFromDatabase(categoryId);

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

/**
 * Process a casino top block
 * @param fieldValues The raw field values
 * @returns The processed block properties
 */
async function processCasinoTopBlock(fieldValues: string): Promise<CasinoTopBlockProps> {
    const data = safeParseJSON<CasinoTopDataRaw>(fieldValues, {});

    const showOptions: CasinoTopOption[] =
        Array.isArray(data.table_show_options)
            ? data.table_show_options.map((o: CasinoTopOptionRaw) => ({
                id: Number(o.id || 0),
                position: Number(o.position || 0),
                static_field: String(o.static_field ?? ""),
            }))
            : [];

    const showCasinosConfig: PositionedItem[] =
        Array.isArray(data.table_show_casinos)
            ? data.table_show_casinos.map((c) => ({
                id: Number(c.id || 0),
                position: Number(c.position || 0),
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
