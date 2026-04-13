export type SlotOverviewStat = {
    position: number;
    label: string;
    value: string;
};

export type SlotOverviewCertificate = {
    position: number;
    label: string;
    image?: string;
};

export type SlotOverviewFaq = {
    position: number;
    question: string;
    answer: string;
};

export type SlotOverviewData = {
    title?: string;
    description?: string;
    rating?: number | string;

    thumbnail?: string;
    featuredImage?: string;
    gameplayImage?: string;

    primaryButtonLabel?: string;
    primaryButtonLink?: string;
    secondaryButtonLabel?: string;
    secondaryButtonLink?: string;

    stats: SlotOverviewStat[];
    certificates: SlotOverviewCertificate[];
    faqs: SlotOverviewFaq[];
};
