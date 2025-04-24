
import React from 'react';
import { headers } from 'next/headers';
import DesktopHome from '@/components/desktop/Home';
import MobileHome  from '@/components/mobile/Home';

export default async function HomePage() {
    const ua       = (await headers()).get('user-agent') || '';
    const isMobile = /mobile/i.test(ua);

    return isMobile ? <MobileHome /> : <DesktopHome />;
}
