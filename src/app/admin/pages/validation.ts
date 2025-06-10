import {z} from "zod";
import {strToSlug} from "@lib/str";

const buildPageSchema = z.object({
    build_id: z.number(),
    position: z.number(),
    field_values: z.string(),
});

const fieldSchema = {
    label: z.string().min(1, 'Min length must be at least 1 characters'),
    slug: z.string().transform(val=>strToSlug(val)).optional(),
    published: z.boolean(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    meta_keywords: z.string().optional(),
    meta_noindex_nofollow: z.boolean(),
    buildsPage: z.array(buildPageSchema).optional(),
}

export const pageCreateSchema = z.object({...fieldSchema});

export const pageUpdateSchema = z.object({...fieldSchema});

export type PageCreateInput = z.infer<typeof pageCreateSchema>;
export type PageUpdateInput = z.infer<typeof pageUpdateSchema>;
