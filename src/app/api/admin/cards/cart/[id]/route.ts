import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma-client';
import { withAdminAuthorized } from "@lib/authorized";
import { cartUpdateSchema } from "@app/admin/cards/cart/validation";
import { CardType } from "@prismaClient";
import {strToSlug} from "@lib/str";

type requestParams = { params: { id: string } };

export async function GET(req: Request, { params }: requestParams) {
    const { id } = await params;
    return await withAdminAuthorized(async (id: number) => {
        try {
            const entity = await prisma.card.findUnique({
                where: {
                    id,
                    type: CardType.cart
                },
                include: {
                    category_card: true
                }
            });

            if (!entity) {
                return NextResponse.json({ error: 'Cart card not found' }, { status: 404 });
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
            const validationResult = cartUpdateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), { status: 400 });
            }

            const data = validationResult.data;
            
            // Set the type to CardType.cart
            const cardData = {
                ...data,
                type: CardType.cart,
                referral_key: strToSlug(data.referral_key),
                category_card_id: data.category_card_id ? parseInt(data.category_card_id) : null
            };

            // Check if referral_key is unique
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

            const entity = await prisma.card.update({
                where: { id },
                data: cardData
            });

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

            // Verify the card exists and is of type cart
            const card = await prisma.card.findUnique({
                where: {
                    id,
                    type: CardType.cart
                }
            });

            if (!card) {
                return NextResponse.json({ error: 'Cart card not found' }, { status: 404 });
            }

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
