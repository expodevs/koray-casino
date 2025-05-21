
import React from 'react';
import { headers } from 'next/headers';
import DesktopSlotGames from '@/src/components/desktop/SlotGames';
import MobileSlotGames  from '@/src/components/mobile/SlotGames';

export default async function SlotGamesPage() {
    const ua       = (await headers()).get('user-agent') || '';
    const isMobile = /mobile/i.test(ua);

    return isMobile ? <MobileSlotGames /> : <DesktopSlotGames />;
}



