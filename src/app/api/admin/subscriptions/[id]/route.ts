import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@lib/prisma-client';
import { withAdminAuthorized } from '@lib/authorized';

type RequestParams = { params: Promise<{ id: string }> };

const updateSchema = z.object({
    is_active: z.boolean(),
});

export async function PUT(req: NextRequest, { params }: RequestParams) {
    const { id } = await params;

    return await withAdminAuthorized(async (req: NextRequest, id: number) => {
        try {
            if (!id) {
                return NextResponse.json({ error: 'Bad request' }, { status: 400 });
            }

            const body = await req.json();
            const validation = updateSchema.safeParse(body);

            if (!validation.success) {
                return NextResponse.json(validation.error.format(), { status: 400 });
            }

            const entity = await prisma.subscription.update({
                where: { id },
                data: validation.data,
            });

            return NextResponse.json(entity);
        } catch (error) {
            console.error('Admin subscription PUT error:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }, req, parseInt(id) || 0);
}

export async function DELETE(req: NextRequest, { params }: RequestParams) {
    const { id } = await params;

    return await withAdminAuthorized(async (id: number) => {
        try {
            if (!id) {
                return NextResponse.json({ error: 'Bad request' }, { status: 400 });
            }

            await prisma.subscription.delete({ where: { id } });
            return new NextResponse(null, { status: 204 });
        } catch (error) {
            console.error('Admin subscription DELETE error:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }, parseInt(id) || 0);
}
