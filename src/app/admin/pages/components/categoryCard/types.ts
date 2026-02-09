export enum CategoryCardType {
    CARD_CASINO_WITH_FAQ  = 'card-casino_with-faq',
    CARD_CASINO_WITH_OPTIONS  = 'card-casino_with-options',
    CARD_GAME_COMPARE  = 'card-game_compare',
    CARD_GAME_FULL  = 'card-game_full',
    CARD_GAME_SHORT_PLAY  = 'card-game_short-play',
    CARD_GAME_SHORT  = 'card-game_short',
    CARD_SLOT_FULL_WITH_MORE_OPTIONS  = 'card-slot_full-with-more-options',
    CARD_SLOT_FULL  = 'card-slot_full',
    CARD_SLOT_ONLY_OPTIONS_REVIEW  = 'card-slot_only-options-review',
    CARD_SLOT_ONLY_OPTIONS  = 'card-slot_only-options',
    CARD_SLOT_OPTIONS_AND_DESCRIPTION  = 'card-slot_options-and-description',
    CARD_SLOT_SIMPLE  = 'card-slot_simple',
    CARD_SLOT_SIMPLE_LAST_UPDATE  = 'card-slot_simple_last-update',
    CARD_SLOT_WITHOUT_FAQ  = 'card-slot_without-faq',
    CARD_SHOW_OPTION  = 'card-show-option',
}

export type SlotCardSource = 'category' | 'manual';

export interface BaseCategoryCard {
    label?: string;
    description?: string;
    // Slot cards can be built from a category or a manual list
    source?: SlotCardSource;
    category_id?: string;
    card_ids?: number[];
    last_update?: string;
    ad_disclosure?: string;
    options?: string;
    type: CategoryCardType;
}

export interface FilterCategoryCard {
    label?: string;
    description?: string;
    category_id?: string;
    show_filter: boolean;
    type: CategoryCardType;
}

export interface ExtendedCategoryCard extends BaseCategoryCard {
    show_filter: boolean;
    cardIconImages?: { icon_card_image_id: number }[];
    iconCardItems?: string; // JSON string of IconCardItem[]
}

export type CategoryCardValue = BaseCategoryCard | FilterCategoryCard | ExtendedCategoryCard;
