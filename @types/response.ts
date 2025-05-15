import {InputType, MenuType, OptionType} from "@prismaClient";

export interface UserRow {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: string;
}

export interface User {
    name: string;
    email: string;
    password: string;
}

export interface Menu {
    id: number,
    type: MenuType,
    published: boolean,
    label: string,
    link: string,
    parent_id: number | null,
    position: number,
}

export interface Setting {
    id: number,
    input_type: InputType,
    label: string,
    value: string,
}

export interface Page {
    id: number,
    published: boolean,
    label: string,
    slug: string,
    meta_title: string,
    meta_description: string,
    meta_keywords: string,
    meta_noindex_nofollow: boolean,
    builds: BuildPage[],
}

export interface BuildPage {
    build_id: number,
    position: number,
    field_values: string,
    card_type: string|null,
}

export interface CategoryCard {
    id: number,
    published: boolean,
    label: string,
}

export interface Faq {
    id: number,
    published: boolean,
    question: string,
    answer: string,
    position: number | null,
}

export interface IconCard {
    id: number,
    label: string,
    published: number | null,
}

export interface IconCardSelect {
    id: number;
    label: string;
}

export interface IconCardImage {
    id: number;
    icon_card_id: number;
    alt: string;
    image: string;
    position: number | null;
    icon_card: IconCard;
}

export interface CustomSelectOption {
    value: number|string;
    label: number|string;
}


export interface Option {
    id: number,
    published: boolean,
    use_for_filter: boolean,
    label: string,
    type: OptionType,
    input_type: InputType,
    tooltip: string | null,
    hash_tag: string | null,
    value: string | null,
    position: number | null,
}

export interface Casino {
    id: number,
    published: boolean,
    name: string,
    tooltip: string | null,
    image: string,
    referral_key: string,
    referral_link: string | null,
    full_review_label: string | null,
    full_review_link: string | null,
}

export interface ApiResponse<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
