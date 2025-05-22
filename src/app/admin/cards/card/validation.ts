import { z } from "zod";

const fieldSchema = {
  published: z.boolean().default(false),
  category_card_id: z.number().optional(),
  label: z.string().min(1, 'Label is required'),
  description: z.string().optional(),
  referral_key: z.string().min(1, 'Referral key is required'),
  referral_btn_1_link: z.string().optional(),
  referral_btn_2_link: z.string().optional(),
  position: z.string().optional().transform(val => val ? parseInt(val) : undefined),
};

export const cardCreateSchema = z.object({...fieldSchema});
export const cardUpdateSchema = z.object({...fieldSchema});

export type CardCreateInput = z.infer<typeof cardCreateSchema>;
export type CardUpdateInput = z.infer<typeof cardUpdateSchema>;
