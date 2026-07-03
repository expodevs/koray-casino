import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import prisma from "@lib/prisma-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getOrigin(): Promise<string> {
    const h = await headers();

    const host =
        h.get("x-forwarded-host") ||
        h.get("host");

    const proto =
        h.get("x-forwarded-proto") ||
        (host?.includes("localhost") ? "http" : "https");

    if (host) {
        return `${proto}://${host}`;
    }

    return process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "https://example.com";
}

function getPageUrl(origin: string, slug: string): string {
    const cleanOrigin = origin.replace(/\/+$/g, "");

    if (!slug || slug === "home") {
        return cleanOrigin;
    }

    return `${cleanOrigin}/${slug.replace(/^\/+|\/+$/g, "")}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const origin = await getOrigin();

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
        url: getPageUrl(origin, page.slug),
        lastModified: page.updated_at || page.published_at || new Date(),
        changeFrequency: "weekly",
        priority: page.slug === "home" ? 1 : 0.8,
    }));
}
