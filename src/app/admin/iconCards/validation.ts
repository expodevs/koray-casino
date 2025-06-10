import {z} from "zod";

const fieldSchema = {
    label: z.string().min(1, 'Min length must be at least 1 characters'),
    published: z.boolean(),
}

export const iconCardCreateSchema = z.object({...fieldSchema});

export const iconCardUpdateSchema = z.object({...fieldSchema});

export type IconCardCreateInput = z.infer<typeof iconCardCreateSchema>;
export type IconCardUpdateInput = z.infer<typeof iconCardUpdateSchema>;

