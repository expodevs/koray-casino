import React from 'react';
import { Metadata } from "next";
import { headers } from 'next/headers';
import { getPageWithBlocks } from "@app/api/front/page";
import DesktopBuilderPage from '@components/desktop/BuilderPage';
import MobileBuilderPage  from '@components/mobile/BuilderPage';
import MobileBurPage  from '@components/mobile/section/BtnsBlock';
import { notFound } from "next/navigation";

type PageProps = {
    params: { slug?: string[] };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const slugArray = params.slug ?? [];
    const slug = slugArray.length > 0 ? slugArray.join("/") : "home";

    const page: PageWithBlocks | null = await getPageWithBlocks(slug);
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
export default async function Page({ params }: { params?: { slug?: string[] } }) {
    const realSlug = params?.slug?.[0] ?? 'home';
    const page = await getPageWithBlocks(realSlug);

    if (!page) {
        notFound();
    }

    const ua       = (await headers()).get('user-agent') || '';
    const isMobile = /mobile/i.test(ua);

    return isMobile ? <MobileBuilderPage slug={realSlug} page={page}/> : <DesktopBuilderPage slug={realSlug} page={page}/>;
}
