export enum BtnBlockType {
    inline = 'inline',
    button = 'button',
    modal = 'modal'
}

export interface BtnBlockItem {
    position: number;
    label: string;
    link?: string;
    content?: string;
}

export interface BtnBlockData {
    buttons: BtnBlockItem[];
    type: BtnBlockType;
}
