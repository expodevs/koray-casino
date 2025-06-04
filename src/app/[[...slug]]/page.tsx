
import React from 'react';
import { headers } from 'next/headers';
import { getPageWithBlocks } from "@app/api/front/page";
import DesktopBuilderPage from '@components/desktop/BuilderPage';
import MobileBuilderPage  from '@components/mobile/BuilderPage';


export default async function Page({ params }: { params?: { slug?: string[] } }) {
    const realSlug = params?.slug?.[0] ?? 'home';
    const page = await getPageWithBlocks(realSlug);
    const ua       = (await headers()).get('user-agent') || '';
    const isMobile = /mobile/i.test(ua);

    return isMobile ? <MobileBuilderPage slug={realSlug} page={page}/> : <DesktopBuilderPage slug={realSlug} page={page}/>;
}
