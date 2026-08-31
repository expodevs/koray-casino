import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { getPageWithBlocks } from "@app/api/front/page";
import { getFrontSettings } from "@app/api/front/settings";

import DesktopBuilderPage from "@components/desktop/BuilderPage";
import MobileBuilderPage from "@components/mobile/BuilderPage";
import JsonLd from "@lib/seo/JsonLd";
import { buildStructuredData } from "@lib/seo/buildStructuredData";
import AboutPage from "@components/desktop/templates/AboutPage/AboutPage";

type PageParams = {
    params: Promise<{ slug?: string[] }>;
};

function getCurrentSlug(slug?: string[]): string {
    return slug && slug.length > 0 ? slug.join("/") : "home";
}

function getOriginFromHeaders(h: Headers): string {
    const host = h.get("x-forwarded-host") || h.get("host");
    const proto = h.get("x-forwarded-proto") || "https";

    return host ? `${proto}://${host}` : "http://localhost:3000";
}

function getPageUrl(origin: string, slug: string): string {
    if (!slug || slug === "home") {
        return origin;
    }

    return `${origin}/${slug.replace(/^\/+|\/+$/g, "")}`;
}

function getAbsoluteUrl(origin: string, value?: string | null): string | undefined {
    if (!value) return undefined;

    if (value.startsWith("http://") || value.startsWith("https://")) {
        return value;
    }

    return `${origin}${value.startsWith("/") ? value : `/${value}`}`;
}

function stripHtml(value?: string | null): string {
    return String(value || "")
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function normalizeSiteName(value?: string | null): string {
    const cleanValue = stripHtml(value);

    if (!cleanValue || cleanValue.toLowerCase() === "logo") {
        return "Koray";
    }

    return cleanValue;
}

export async function generateMetadata({ params, }: {
    params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
    const { slug } = await params;

    const slugArray = slug ?? [];
    const currentSlug = getCurrentSlug(slugArray);

    const page = await getPageWithBlocks(currentSlug);

    if (!page) {
        return {
            title: "Page not found",
            description: "Requested page not found",
            keywords: [],
            robots: { index: false, follow: false },
        };
    }

    const settings = await getFrontSettings();

    const h = await headers();
    const origin = getOriginFromHeaders(h);
    const pageUrl = getPageUrl(origin, currentSlug);

    const title = stripHtml(page.meta?.title || page.label || "Koray");
    const description = stripHtml(page.meta?.description || "");
    const siteName = normalizeSiteName(settings.logo?.label);

    const logoUrl = getAbsoluteUrl(origin, settings.logo?.value);

    const ogImageUrl = logoUrl || `${origin}/og-image.jpg`;

    return {
        metadataBase: new URL(origin),

        title,
        description,
        keywords: page.meta.keywords,

        robots: page.meta.noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },

        alternates: {
            canonical: pageUrl,
        },

        openGraph: {
            title,
            description,
            url: pageUrl,
            siteName,
            type: "website",
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImageUrl],
        },
    };
}

export default async function Page({ params }: PageParams) {
    const { slug } = await params;
    const realSlug = getCurrentSlug(slug);

    const page = await getPageWithBlocks(realSlug);

    if (!page) {
        notFound();
    }

    const settings = await getFrontSettings();

    const h = await headers();

    const ua = h.get("user-agent") || "";
    const isMobile = /mobile/i.test(ua);

    const origin = getOriginFromHeaders(h);

    const structuredData = buildStructuredData({
        page,
        slug: realSlug,
        origin,
        logo: settings.logo?.value,
        siteName: settings.logo?.label,
    });

    return (
        <>
            <JsonLd data={structuredData} />

            {realSlug === "about-us" ? (
                <AboutPage page={page} />
            ) : isMobile ? (
                <MobileBuilderPage slug={realSlug} page={page} />
            ) : (
                <DesktopBuilderPage slug={realSlug} page={page} />
            )}
        </>
    );
}
