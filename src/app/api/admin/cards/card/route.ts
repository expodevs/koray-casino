import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma-client";
import { withAdminAuthorized } from "@lib/authorized";
import { cardCreateSchema } from "@app/admin/cards/card/validation";
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
                        type: CardType.card
                    },
                    select: {
                        id: true,
                        published: true,
                        type: true,
                        category_card_id: true,
                        label: true,
                        description: true,
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
                        type: CardType.card
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

            // Set the type to CardType.card
            const cardData = {
                ...data,
                type: CardType.card,
                referral_key: strToSlug(data.referral_key),
                category_card_id: data.category_card_id ? parseInt(data.category_card_id) : null
            };

            // Check if referral_key is unique
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

            // Create the card
            const entity = await prisma.card.create({
                data: cardData
            });

            // Process related data if provided
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

            if (body.images && Array.isArray(body.images)) {
                await Promise.all(body.images.map(async (image: { src: string, newImage: string, alt: string, position: number }) => {
                    let imageSrc = image.src;

                    // If newImage is provided, save it and use the new path
                    if (image.newImage && typeof image.newImage === 'string' && image.newImage.length > 0) {
                        imageSrc = await saveBase64File(image.newImage, cardImagePath(entity.id));
                    }

                    await prisma.cardImage.create({
                        data: {
                            card_id: entity.id,
                            src: imageSrc,
                            alt: image.alt || '',
                            position: image.position
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
