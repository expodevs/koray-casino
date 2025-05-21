export interface CasinoItem {
    id: string;
    position: number;
}

export interface OptionItem {
    id: string;
    position: number;
    static_field?: string;
}

export interface CasinoTopData {
    table_show_options: OptionItem[];
    table_show_casinos: CasinoItem[];
}
