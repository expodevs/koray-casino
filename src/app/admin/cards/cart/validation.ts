import { z } from "zod";

const fieldSchema = {
  published: z.boolean().default(false),
  category_card_id: z.string().optional(),
  label: z.string().min(1, 'Label is required'),
  description: z.string().optional(),
  referral_key: z.string().min(1, 'Referral key is required'),
  referral_btn_1_link: z.string().optional(),
  position: z.string().optional().transform(val => val ? parseInt(val) : undefined),
};

export const cartCreateSchema = z.object({...fieldSchema});
export const cartUpdateSchema = z.object({...fieldSchema});

export type CartCreateInput = z.infer<typeof cartCreateSchema>;
export type CartUpdateInput = z.infer<typeof cartUpdateSchema>;
