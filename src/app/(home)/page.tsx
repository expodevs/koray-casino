
import React from 'react';
import { headers } from 'next/headers';
import DesktopHome from '@/src/components/desktop/Home';
import MobileHome  from '@/src/components/mobile/Home';

export default async function HomePage() {
    const ua       = (await headers()).get('user-agent') || '';
    const isMobile = /mobile/i.test(ua);

    return isMobile ? <MobileHome /> : <DesktopHome />;
}
