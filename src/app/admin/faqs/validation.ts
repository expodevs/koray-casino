import {z} from "zod";


const fieldSchema = {
    published: z.boolean(),
    question: z.string().min(1, 'Min length must be at least 1 characters'),
    answer: z.string().min(1, 'Min length must be at least 1 characters'),
    position: z.number().optional(),
}

export const faqCreateSchema = z.object({...fieldSchema});

export const faqUpdateSchema = z.object({...fieldSchema});

export type OptionCreateInput = z.infer<typeof faqCreateSchema>;
export type OptionUpdateInput = z.infer<typeof faqUpdateSchema>;

