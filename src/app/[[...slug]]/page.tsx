
import React from 'react';
import { headers } from 'next/headers';
import { getPageWithBlocks } from "@app/api/front/page";
import DesktopHome from '@components/desktop/BuilderPage';
import MobileHome  from '@components/mobile/BuilderPage';


export default async function Page({ params }: { params?: { slug?: string[] } }) {
    const realSlug = params?.slug?.[0] ?? 'home';
    const page = await getPageWithBlocks(realSlug);
    const ua       = (await headers()).get('user-agent') || '';
    const isMobile = /mobile/i.test(ua);

    return isMobile ? <MobileHome slug={realSlug} page={page}/> : <DesktopHome slug={realSlug} page={page}/>;
}
