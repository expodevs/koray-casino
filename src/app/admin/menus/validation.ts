import {z} from "zod";
import {MenuType} from "@prismaClient";


export const menuCreateSchema = z.object({
    type: z.nativeEnum(MenuType),
    published: z.boolean().default(false),
    label: z.string().min(1, 'Label is required'),
    link: z.string().min(1, 'Link is required'),
    parent_id: z
        .union([z.string(), z.number(), z.null()])
        .transform((val) => {
            if (val === '' || val === 'null' || val === null) return null;
            return Number(val)||null;
        })
        .optional(),
    position: z.number().default(1),
});

export const menuUpdateSchema = z.object({
    type: z.nativeEnum(MenuType),
    published: z.boolean().default(false),
    label: z.string().min(1, 'Label is required'),
    link: z.string().min(1, 'Link is required'),
    parent_id: z
        .union([z.string(), z.number(), z.null()])
        .transform((val) => {
            if (val === '' || val === 'null' || val === null) return null;
            return Number(val)||null;
        })
        .optional(),
    position: z.number().default(1),
});

export type MenuCreateInput = z.infer<typeof menuCreateSchema>;
export type MenuUpdateInput = z.infer<typeof menuUpdateSchema>;

