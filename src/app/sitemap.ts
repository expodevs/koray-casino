import type { MetadataRoute } from "next";
import prisma from "@lib/prisma-client";

const SITE_URL = process.env.NEXTAUTH_URL || "https://example.com";

function getPageUrl(slug: string): string {
    if (!slug || slug === "home") {
        return SITE_URL;
    }

    return `${SITE_URL}/${slug.replace(/^\/+|\/+$/g, "")}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pages = await prisma.page.findMany({
        where: {
            published: true,
            meta_noindex_nofollow: false,
        },
        select: {
            slug: true,
            published_at: true,
            updated_at: true,
        },
    });

    return pages.map((page) => ({
        url: getPageUrl(page.slug),
        lastModified: page.updated_at || page.published_at || new Date(),
        changeFrequency: "weekly",
        priority: page.slug === "home" ? 1 : 0.8,
    }));
}
