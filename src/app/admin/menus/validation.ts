import {z} from "zod";
import {MenuType} from "@prismaClient";

const fieldSchema = {
    type: z.nativeEnum(MenuType),
    published: z.boolean(),
    label: z.string().min(1, 'Label is required'),
    link: z.string().min(1, 'Link is required'),
    parent_id: z.number().optional(),
    position: z.number().optional(),
};

export const menuCreateSchema = z.object({...fieldSchema});

export const menuUpdateSchema = z.object({...fieldSchema});

export type MenuCreateInput = z.infer<typeof menuCreateSchema>;
export type MenuUpdateInput = z.infer<typeof menuUpdateSchema>;
