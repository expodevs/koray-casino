import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma-client";
import { withAdminAuthorized } from "@lib/authorized";
import { cartCreateSchema } from "@app/admin/cards/cart/validation";
import { CardType } from "@prismaClient";
import {strToSlug} from "@lib/str";

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
                        type: CardType.cart
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
                        type: CardType.cart
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
            const validationResult = cartCreateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), { status: 400 });
            }

            const data = validationResult.data;

            const cardData = {
                ...data,
                type: CardType.cart,
                referral_key: strToSlug(data.referral_key),
                category_card_id: data.category_card_id ? parseInt(data.category_card_id) : null
            };

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

            return NextResponse.json(entity, { status: 201 });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }, req);
}
