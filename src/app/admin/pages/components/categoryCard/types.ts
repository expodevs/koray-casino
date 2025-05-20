export enum CategoryCardType {
    BASE = 'base',
    BASE_OPTION = 'base_option',
    BASE_OPTION_FAQ = 'base_option_faq',
    CASINO = 'casino'
}

export interface BaseCategoryCard {
    label?: string;
    description?: string;
    category_id?: string;
    last_update?: string;
    ad_disclosure?: string;
    type: CategoryCardType;
}

export interface FilterCategoryCard {
    category_id?: string;
    show_filter: boolean;
    type: CategoryCardType;
}

export interface ExtendedCategoryCard extends BaseCategoryCard {
    show_filter: boolean;
}

export type CategoryCardValue = BaseCategoryCard | FilterCategoryCard | ExtendedCategoryCard;