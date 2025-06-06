import React from 'react';
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { headers } from 'next/headers';
import { getPageWithBlocks, PageWithBlocks } from "@app/api/front/page";
import DesktopBuilderPage from '@components/desktop/BuilderPage';
import MobileBuilderPage  from '@components/mobile/BuilderPage';
import { notFound } from "next/navigation";


const MobileBuilderPage = dynamic(
    () =>
        import("@components/mobile/BuilderPage").then((mod) => {
            return mod;
        }),
    { ssr: true }
);

const DesktopBuilderPage = dynamic(
    () =>
        import("@components/desktop/BuilderPage").then((mod) => {
            return mod;
        }),
    { ssr: true }
);

type PageProps = {
    params: { slug?: string[] };
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { params } = props;
    const slugArray = (await params).slug ?? [];
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
export default async function Page(props: PageProps) {
    const { params } = props;
    const slugArray = (await params).slug ?? [];
    const realSlug = slugArray.length > 0 ? slugArray[0] : "home";
    const page = await getPageWithBlocks(realSlug);

    if (!page) {
        notFound();
    }

    const ua       = (await headers()).get('user-agent') || '';
    const isMobile = /mobile/i.test(ua);

    return isMobile ? <MobileBuilderPage slug={realSlug} page={page}/> : <DesktopBuilderPage slug={realSlug} page={page}/>;
}
