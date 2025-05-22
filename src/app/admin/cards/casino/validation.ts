import { z } from "zod";
import {CardColor} from "@prismaClient";

const fieldSchema = {
  published: z.boolean().default(false),
  category_card_id: z.number().optional(),
  label: z.string().min(1, 'Label is required'),
  referral_key: z.string().min(1, 'Referral key is required'),
  referral_btn_1_link: z.string().optional(),
  referral_btn_2_link: z.string().optional(),
  terms_and_condition: z.string().optional(),
  casino_image: z.string().optional(),
  newImage: z.string().optional(),
  good_selection_of_games: z.nativeEnum(CardColor).optional(),
  no_game_provider_filter: z.nativeEnum(CardColor).optional(),
  live_chat_available_only_after_registration: z.nativeEnum(CardColor).optional(),
  position: z.string().optional().transform(val => val ? parseInt(val) : undefined),
};

export const cardCreateSchema = z.object({...fieldSchema});
export const cardUpdateSchema = z.object({...fieldSchema});

export type CardCreateInput = z.infer<typeof cardCreateSchema>;
export type CardUpdateInput = z.infer<typeof cardUpdateSchema>;
