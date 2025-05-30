import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma-client";


async function handleCardRedirect(referralKey: string, clickType: string): Promise<{ redirectUrl: string | null; error?: { message: string; status: number } }> {
  const card = await prisma.card.findUnique({
    where: {
      referral_key: referralKey
    }
  });

  if (!card) {
    return {
      redirectUrl: null,
      error: {
        message: 'Card not found with the provided referral_key',
        status: 404
      }
    };
  }

  let redirectUrl: string | null = null;
  switch (clickType) {
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

  return { redirectUrl };
}

async function handleCasinoTopRedirect(referralKey: string, clickType: string): Promise<{ redirectUrl: string | null; error?: { message: string; status: number } }> {
  const casino = await prisma.casino.findUnique({
    where: {
      referral_key: referralKey
    }
  });

  if (!casino) {
    return {
      redirectUrl: null,
      error: {
        message: 'Casino not found with the provided referral_key',
        status: 404
      }
    };
  }

  let redirectUrl: string | null = null;
  switch (clickType) {
    case 'full_review_link':
      redirectUrl = casino.full_review_link;
      break;
    case 'link':
    default:
      redirectUrl = casino.referral_link;
      break;
  }

  return { redirectUrl };
}


/**
 *
 * /api/front/redirect/{type}/{referralKey}[/{clickType}]
 *
 * {type} is the type of redirect ('card' or 'casino-top')
 * {referralKey} is the unique key used to find the record in the database
 * {clickType} is an optional parameter that specifies the type of click
 *
 *
 * /api/front/redirect/card/example-card-key
 * /api/front/redirect/card/example-card-key/btn_1_link
 * /api/front/redirect/card/example-card-key/btn_2_link
 *
 * /api/front/redirect/casino-top/example-casino-key
 * /api/front/redirect/casino-top/example-casino-key/full_review_link
 *
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { type: string; referralKey: string; clickType?: string[] } }
) {
  try {
    const type = params.type;
    const referralKey = params.referralKey;

    const clickType = params.clickType && params.clickType.length > 0 
      ? params.clickType[0] 
      : 'link';

    if (type !== 'card' && type !== 'casino-top') {
      return NextResponse.json(
        { error: 'Invalid type parameter. Must be "card" or "casino-top"' },
        { status: 400 }
      );
    }

    let redirectUrl: string | null = null;
    let result;

    if (type === 'card') {
      result = await handleCardRedirect(referralKey, clickType);

      if (result.error) {
        return NextResponse.json(
          { error: result.error.message },
          { status: result.error.status }
        );
      }

      redirectUrl = result.redirectUrl;
    }

    if (type === 'casino-top') {
      result = await handleCasinoTopRedirect(referralKey, clickType);

      if (result.error) {
        return NextResponse.json(
          { error: result.error.message },
          { status: result.error.status }
        );
      }

      redirectUrl = result.redirectUrl;
    }

    if (!redirectUrl) {
      return NextResponse.json(
        { error: 'No redirect URL found for the provided parameters' },
        { status: 404 }
      );
    }

    return NextResponse.redirect(redirectUrl, {status: 301});

  } catch (error) {
    console.error('Redirect error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
