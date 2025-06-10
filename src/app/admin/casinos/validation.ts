import {z} from "zod";

const commonFields = {
    published: z.boolean(),
    name: z.string().min(1, 'Min length must be at least 1 characters'),
    tooltip: z.string().nullable().optional(),
    referral_key: z.string().min(1, 'Referral key is required'),
    referral_link: z.string().nullable().optional(),
    full_review_label: z.string().nullable().optional(),
    full_review_link: z.string().nullable().optional(),
    newImage: z.string().optional(),
    options: z.array(
        z.object({
            id: z.number().optional(),
            option_id: z.number(),
            casino_id: z.number().optional(),
            value: z.string(),
            entity: z.any().optional()
        })
    ).optional(),
}

export const casinoCreateSchema = z.object({
    ...commonFields,
    image: z.string().optional(),
}).refine(data => {
    return data.newImage || data.image;
}, {
    message: "Either image or newImage must be provided",
    path: ["image"]
});

export const casinoUpdateSchema = z.object({
    ...commonFields,
    image: z.string().optional(),
}).refine(data => {
    return data.newImage || data.image;
}, {
    message: "Either image or newImage must be provided",
    path: ["image"]
});

export type CasinoCreateInput = z.infer<typeof casinoCreateSchema>;
export type CasinoUpdateInput = z.infer<typeof casinoUpdateSchema>;
