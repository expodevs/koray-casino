import {z} from "zod";
import {InputType} from "@prismaClient";


const fieldSchema = {
    label: z.string().min(1, 'Min length must be at least 1 characters'),
    code: z.string().min(1, 'Min length must be at least 1 characters'),
    input_type: z.nativeEnum(InputType),
    value: z.string(),
    newImage: z.string().optional(),
}

export const settingCreateSchema = z.object({...fieldSchema});

export const settingUpdateSchema = z.object({...fieldSchema});

export type SettingCreateInput = z.infer<typeof settingCreateSchema>;
export type SettingUpdateInput = z.infer<typeof settingUpdateSchema>;
