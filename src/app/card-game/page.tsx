
import React from 'react';
import { headers } from 'next/headers';
import DesktopCardGames from '@/src/components/desktop/CardGames';
import MobileCardGames  from '@/src/components/mobile/CardGames';

export default async function CardGamesPage() {
    const ua       = (await headers()).get('user-agent') || '';
    const isMobile = /mobile/i.test(ua);

    return isMobile ? <MobileCardGames /> : <DesktopCardGames />;
}



