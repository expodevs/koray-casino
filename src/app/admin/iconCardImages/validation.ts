import {z} from "zod";

const fieldSchema = {
    icon_card_id: z.number(),
    alt: z.string().min(1, 'Min length must be at least 1 characters'),
    label: z.string().optional(),
    image: z.string(),
    newImage: z.string().optional(),
    position: z.number().optional(),
}

export const iconCardImageCreateSchema = z.object({...fieldSchema});

export const iconCardImageUpdateSchema = z.object({...fieldSchema});

export type IconCardImageCreateInput = z.infer<typeof iconCardImageCreateSchema>;
export type IconCardImageUpdateInput = z.infer<typeof iconCardImageUpdateSchema>;
