import {z} from "zod";
import {strToSlug} from "@lib/str";
import {InputType} from "@prismaClient";

const fieldSchema = {
    published: z.boolean(),
    use_for_filter: z.boolean(),
    input_type: z.nativeEnum(InputType),
    label: z.string().min(1, 'Min length must be at least 1 characters'),
    tooltip: z.string().nullable().optional(),
    hash_tag: z.string().nullable().transform(val=>{
        if (val === '' || val === 'null' || val === null) return null;
        return strToSlug(val);
    }).optional(),
    value: z.string().optional(),
    newImage: z.string().optional(),
    position: z.number().optional(),
}

export const optionCreateSchema = z.object({...fieldSchema});

export const optionUpdateSchema = z.object({...fieldSchema});

export type OptionCreateInput = z.infer<typeof optionCreateSchema>;
export type OptionUpdateInput = z.infer<typeof optionUpdateSchema>;
