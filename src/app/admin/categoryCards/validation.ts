import {z} from "zod";

const fieldSchema = {
    label: z.string().min(1, 'Min length must be at least 1 characters'),
    published: z.boolean(),
}

export const categoryCardCreateSchema = z.object({...fieldSchema});

export const categoryCardUpdateSchema = z.object({...fieldSchema});

export type OptionCreateInput = z.infer<typeof categoryCardCreateSchema>;
export type OptionUpdateInput = z.infer<typeof categoryCardUpdateSchema>;

