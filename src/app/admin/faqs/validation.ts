import {z} from "zod";


const fieldSchema = {
    published: z.boolean().default(false),
    question: z.string().min(1, 'Min length must be at least 1 characters'),
    answer: z.string().min(1, 'Min length must be at least 1 characters'),
    position: z
        .union([z.string(), z.number(), z.null()])
        .transform((val) => {
            if (val === '' || val === 'null' || val === null) return null;
            return Number(val)||null;
        })
        .nullable()
        .optional(),
}

export const faqCreateSchema = z.object({...fieldSchema});

export const faqUpdateSchema = z.object({...fieldSchema});

export type OptionCreateInput = z.infer<typeof faqCreateSchema>;
export type OptionUpdateInput = z.infer<typeof faqUpdateSchema>;

