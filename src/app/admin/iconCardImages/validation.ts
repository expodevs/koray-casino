import {z} from "zod";

const fieldSchema = {
    icon_card_id: z.number(),
    alt: z.string().min(1, 'Min length must be at least 1 characters'),
    image: z.string(),
    newImage: z.string().optional(),
    position: z
        .union([z.string(), z.number(), z.null()])
        .transform((val) => {
            if (val === '' || val === 'null' || val === null) return null;
            return Number(val)||null;
        })
        .nullable()
        .optional(),
}

export const iconCardImageCreateSchema = z.object({...fieldSchema});

export const iconCardImageUpdateSchema = z.object({...fieldSchema});

export type IconCardImageCreateInput = z.infer<typeof iconCardImageCreateSchema>;
export type IconCardImageUpdateInput = z.infer<typeof iconCardImageUpdateSchema>;
