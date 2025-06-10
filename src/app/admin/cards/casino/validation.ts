import { z } from "zod";
import {CardColor} from "@prismaClient";

const fieldSchema = {
  published: z.boolean(),
  category_card_id: z.number(),
  label: z.string().min(1, 'Label is required'),
  referral_key: z.string().min(1, 'Referral key is required'),
  referral_btn_1_link: z.string().optional(),
  referral_btn_2_link: z.string().optional(),
  terms_and_condition: z.string().optional(),
  casino_image: z.string(),
  newCasinoImage: z.string().optional(),
  good_selection_of_games: z.union([z.nativeEnum(CardColor), z.literal('')]).optional(),
  no_game_provider_filter: z.union([z.nativeEnum(CardColor), z.literal('')]).optional(),
  live_chat_available_only_after_registration: z.union([z.nativeEnum(CardColor), z.literal('')]).optional(),
  position: z.number().optional(),
};

export const cardCreateSchema = z.object({...fieldSchema});
export const cardUpdateSchema = z.object({...fieldSchema});

export type CardCreateInput = z.infer<typeof cardCreateSchema>;
export type CardUpdateInput = z.infer<typeof cardUpdateSchema>;
