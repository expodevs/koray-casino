import slugify from "slugify";

export function strToSlug(str: string) {
    return slugify(str, {lower: true, trim: true, strict: true});
}

