import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma-client";
import { withAdminAuthorized } from "@lib/authorized";
import { cardCreateSchema } from "@app/admin/cards/casino/validation";
import { CardType } from "@prismaClient";
import { strToSlug } from "@lib/str";
import { saveBase64File } from "@lib/file";
import { cardImagePath } from "@lib/uploadPaths";

export async function GET(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {
            const { searchParams } = new URL(req.url);
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '10');
            const skip = Math.max(page - 1, 0) * limit;

            const [entities, total] = await prisma.$transaction([
                prisma.card.findMany({
                    where: {
                        type: CardType.casino
                    },
                    select: {
                        id: true,
                        published: true,
                        type: true,
                        category_card_id: true,
                        label: true,
                        referral_key: true,
                        referral_btn_1_link: true,
                        referral_btn_2_link: true,
                        position: true,
                        category_card: {
                            select: {
                                id: true,
                                label: true
                            }
                        }
                    },
                    skip,
                    take: limit,
                    orderBy: {
                        position: 'asc'
                    }
                }),
                prisma.card.count({
                    where: {
                        type: CardType.casino
                    }
                }),
            ]);

            return NextResponse.json({
                data: entities,
                meta: {
                    page, limit, total, totalPages: Math.ceil(total / limit),
                }
            });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }, req);
}

export async function POST(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {
            const body = await req.json();
            const validationResult = cardCreateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), { status: 400 });
            }

            const data = validationResult.data;

            const cardData = {
                ...data,
                type: CardType.casino,
                referral_key: strToSlug(data.referral_key),
                good_selection_of_games: data.good_selection_of_games || null,
                no_game_provider_filter: data.no_game_provider_filter || null,
                live_chat_available_only_after_registration: data.live_chat_available_only_after_registration || null,
            };

            const newCasinoImage = data.newCasinoImage;
            delete cardData.newCasinoImage;

            const existingCard = await prisma.card.findUnique({
                where: {
                    referral_key: cardData.referral_key
                }
            });

            if (existingCard) {
                return NextResponse.json({ 
                    referral_key: { message: 'Referral key must be unique' } 
                }, { status: 400 });
            }

            const entity = await prisma.card.create({
                data: cardData
            });

            if (newCasinoImage && newCasinoImage.length > 0) {
                const src = await saveBase64File(newCasinoImage, cardImagePath(entity.id));
                await prisma.card.update({where: {id: entity.id}, data: {casino_image: src}});
                entity.casino_image = src;
            }

            if (body.options && Array.isArray(body.options)) {
                await Promise.all(body.options.map(async (option: { option_id: number, value: string }) => {
                    await prisma.cardOption.create({
                        data: {
                            card_id: entity.id,
                            option_id: option.option_id,
                            value: option.value
                        }
                    });
                }));
            }

            if (body.icon_card_images && Array.isArray(body.icon_card_images)) {
                await Promise.all(body.icon_card_images.map(async (image: { icon_card_image_id: number }) => {
                    await prisma.cardIconImage.create({
                        data: {
                            card_id: entity.id,
                            icon_card_image_id: image.icon_card_image_id
                        }
                    });
                }));
            }

            if (body.faqs && Array.isArray(body.faqs)) {
                await Promise.all(body.faqs.map(async (faq: { faq_id: number, position: number }) => {
                    await prisma.faqCard.create({
                        data: {
                            card_id: entity.id,
                            faq_id: faq.faq_id,
                            position: faq.position
                        }
                    });
                }));
            }


            return NextResponse.json(entity, { status: 201 });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }, req);
}
