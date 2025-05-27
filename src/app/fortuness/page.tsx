import React from 'react';
import { headers } from 'next/headers';
import DesktopFortunes from '@/src/components/desktop/Fortunes';
import MobileFortunes  from '@/src/components/mobile/Fortunes';

export default async function FortunesPage() {
    const ua       = (await headers()).get('user-agent') || '';
    const isMobile = /mobile/i.test(ua);

    return isMobile ? <MobileFortunes /> : <DesktopFortunes />
}
