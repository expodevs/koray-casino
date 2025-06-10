import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { getPageWithBlocks } from "@app/api/front/page";
import DesktopBuilderPage from "@components/desktop/BuilderPage";
import MobileBuilderPage from "@components/mobile/BuilderPage";

export async function generateMetadata({params}: {  params: Promise<{ slug: string[] }>}): Promise<Metadata> {
    const { slug } = await params;
    const slugArray = slug ?? [];
    const currentSlug = slugArray.length > 0 ? slugArray.join("/") : "home";

    const page = await getPageWithBlocks(currentSlug);
    if (!page) {
        return {
            title: "Page not found",
            description: "Requested page not found",
            keywords: [],
            robots: { index: false, follow: false },
        };
    }

    return {
        title: page.meta.title,
        description: page.meta.description,
        keywords: page.meta.keywords,
        robots: page.meta.noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },
    };
}

export default async function Page({params}: {  params: Promise<{ slug: string[] }>}) {
    const {slug} = await params
    const realSlug = slug?.[0] ?? "home";
    const page = await getPageWithBlocks(realSlug);
    if (!page) notFound();

    const h = await headers();
    const ua = h.get("user-agent") || "";
    const isMobile = /mobile/i.test(ua);

    return isMobile
        ? <MobileBuilderPage slug={realSlug} page={page} />
        : <DesktopBuilderPage slug={realSlug} page={page} />;
}
