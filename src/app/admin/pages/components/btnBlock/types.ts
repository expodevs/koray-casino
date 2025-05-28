export enum BtnBlockType {
    inline = 'inline',
    button = 'button'
}

export interface BtnBlockItem {
    position: number;
    label: string;
    link: string;
}

export interface BtnBlockData {
    buttons: BtnBlockItem[];
    type: BtnBlockType;
}
