import { redirect, notFound } from 'next/navigation';
import prisma from '@lib/prisma-client';

interface Props {
    params: Promise<{
        type: string;
        referralKey: string;
        clickType?: string[];
    }>;
}

export default async function RedirectPage({ params }: Props) {
    const { type, referralKey, clickType } = await params;

    const clickTypeValue = clickType?.[0] ?? 'link';

    if (!referralKey || (type !== 'card' && type !== 'casino-top')) {
        notFound();
    }

    let redirectUrl: string | null = null;

    if (type === 'card') {
        const card = await prisma.card.findUnique({
            where: { referral_key: referralKey }
        });

        if (!card) notFound();

        switch (clickTypeValue) {
            case 'btn_1_link':
                redirectUrl = card.referral_btn_1_link;
                break;
            case 'btn_2_link':
                redirectUrl = card.referral_btn_2_link;
                break;
            case 'link':
            default:
                redirectUrl = card.referral_btn_1_link || card.referral_btn_2_link;
                break;
        }
    }

    if (type === 'casino-top') {
        const casino = await prisma.casino.findUnique({
            where: { referral_key: referralKey }
        });

        if (!casino) notFound();

        switch (clickTypeValue) {
            case 'full_review_link':
                redirectUrl = casino.full_review_link;
                break;
            case 'link':
            default:
                redirectUrl = casino.referral_link;
                break;
        }
    }

    if (!redirectUrl) notFound();

    redirect(redirectUrl);
}
