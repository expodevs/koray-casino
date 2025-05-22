import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma-client';
import { withAdminAuthorized } from "@lib/authorized";
import { cardUpdateSchema } from "@app/admin/cards/casino/validation";
import { CardType } from "@prismaClient";
import { strToSlug } from "@lib/str";
import { saveBase64File } from "@lib/file";
import {cardImagePath} from "@lib/uploadPaths";
import { fullPublicPath, removeFile } from "@lib/file";

type requestParams = { params: { id: string } };


async function removeOldImage(id: number) {
    const entity = await prisma.card.findUnique({where:{id}});
    if (!entity ||!entity?.casino_image || !entity.casino_image.length) {
        return;
    }

    removeFile(fullPublicPath(entity.casino_image));
}

export async function GET(req: Request, { params }: requestParams) {
    const { id } = await params;
    return await withAdminAuthorized(async (id: number) => {
        try {
            const entity = await prisma.card.findUnique({
                where: {
                    id,
                    type: CardType.casino
                },
                include: {
                    category_card: true,
                    options: true,
                    icon_card_images: {
                        include: {
                            icon_card_image: true
                        }
                    },
                    faqs: {
                        include: {
                            faq: true
                        }
                    },
                }
            });

            if (!entity) {
                return NextResponse.json({ error: 'Card not found' }, { status: 404 });
            }

            return NextResponse.json(entity);
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }, parseInt(id) || 0);
}

export async function PUT(req: NextRequest, { params }: requestParams) {
    const { id } = await params;
    return await withAdminAuthorized(async (req: NextRequest, id: number) => {
        try {
            const body = await req.json();
            const validationResult = cardUpdateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), { status: 400 });
            }

            const data = validationResult.data;

            const cardData = {
                ...data,
                type: CardType.casino,
                referral_key: strToSlug(data.referral_key),
                category_card_id: data.category_card_id ? parseInt(data.category_card_id) : null,
            };

            const existingCard = await prisma.card.findFirst({
                where: {
                    referral_key: cardData.referral_key,
                    NOT: {
                        id: id
                    }
                }
            });

            if (existingCard) {
                return NextResponse.json({ 
                    referral_key: { message: 'Referral key must be unique' } 
                }, { status: 400 });
            }

            const newCasinoImage = cardData.newCasinoImage;
            delete cardData.newCasinoImage;

            if (!cardData.casino_image.length || newCasinoImage && newCasinoImage.length) {
                await removeOldImage(id);
            }

            const entity = await prisma.card.update({
                where: { id },
                data: cardData
            });


            if (newCasinoImage && newCasinoImage.length > 0) {
                const src = await saveBase64File(newCasinoImage, cardImagePath(entity.id));
                await prisma.card.update({where: {id: entity.id}, data: {casino_image: src}});
                entity.casino_image = src;
            }

            if (body.options && Array.isArray(body.options)) {
                await prisma.cardOption.deleteMany({
                    where: { card_id: id }
                });

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
                await prisma.cardIconImage.deleteMany({
                    where: { card_id: id }
                });

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
                await prisma.faqCard.deleteMany({
                    where: { card_id: id }
                });

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
                const existingImages = await prisma.cardImage.findMany({
                    where: { card_id: id }
                });

                const newImageSrcs = body.images.map(img => img.src).filter(src => src && !src.includes('data:'));
                const imagesToDelete = existingImages.filter(img => !newImageSrcs.includes(img.src));

                for (const img of imagesToDelete) {
                    try {
                        removeFile(fullPublicPath(img.src));
                    } catch (error) {
                        console.error('Failed to delete image file:', error);
                    }
                }

                await prisma.cardImage.deleteMany({
                    where: { card_id: id }
                });

                await Promise.all(body.images.map(async (image: { src: string, newImage: string, alt: string, position: number }) => {
                    let imageSrc = image.src;

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

            return NextResponse.json(entity);
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }, req, parseInt(id) || 0);
}

export async function DELETE(req: NextRequest, { params }: requestParams) {
    const { id } = await params;
    return await withAdminAuthorized(async (req: NextRequest, id: number) => {
        try {
            if (!id) {
                return NextResponse.json({ error: 'Bad request' }, { status: 400 });
            }

            const card = await prisma.card.findUnique({
                where: {
                    id,
                    type: CardType.casino
                }
            });

            if (!card) {
                return NextResponse.json({ error: 'Card not found' }, { status: 404 });
            }


            await prisma.cardOption.deleteMany({
                where: { card_id: id }
            });

            await prisma.cardIconImage.deleteMany({
                where: { card_id: id }
            });

            await prisma.faqCard.deleteMany({
                where: { card_id: id }
            });

            await prisma.cardImage.deleteMany({
                where: { card_id: id }
            });

            await prisma.card.delete({
                where: { id }
            });

            return new NextResponse(null, { status: 204 });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }, req, parseInt(id) || 0);
}
