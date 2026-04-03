export type TabsNestedChildItem = {
    position: number;
    label: string;
    image?: string;
    content?: string;
    contentTitle?: string;
    note?: string;
};

export type TabsNestedItem = {
    position: number;
    label: string;
    hasChildren?: boolean;
    image?: string;
    content?: string;
    contentTitle?: string;
    note?: string;
    children?: TabsNestedChildItem[];
};

export type TabsNestedData = {
    title?: string;
    items: TabsNestedItem[];
};
