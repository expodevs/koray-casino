import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@lib/prisma-client';
import { withAdminAuthorized } from '@lib/authorized';

type RequestParams = { params: Promise<{ id: string }> };

const requestUpdateSchema = z.object({
    status: z.enum(['new', 'in_progress', 'closed']),
    answer: z.string().max(20000).nullable().optional(),
    is_published: z.boolean().optional(),
});

export async function GET(req: NextRequest, { params }: RequestParams) {
    const { id } = await params;

    return await withAdminAuthorized(async (id: number) => {
        try {
            const entity = await prisma.contactRequest.findUnique({ where: { id } });

            if (!entity) {
                return NextResponse.json({ error: 'Request not found' }, { status: 404 });
            }

            return NextResponse.json(entity);
        } catch (error) {
            console.error('Admin request GET error:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }, parseInt(id) || 0);
}

export async function PUT(req: NextRequest, { params }: RequestParams) {
    const { id } = await params;

    return await withAdminAuthorized(async (req: NextRequest, id: number) => {
        try {
            const body = await req.json();
            const validation = requestUpdateSchema.safeParse(body);

            if (!validation.success) {
                return NextResponse.json(validation.error.format(), { status: 400 });
            }

            const entity = await prisma.contactRequest.update({
                where: { id },
                data: {
                    ...validation.data,
                    answer: validation.data.answer?.trim() || null,
                },
            });

            return NextResponse.json(entity);
        } catch (error) {
            console.error('Admin request PUT error:', error);
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

            await prisma.contactRequest.delete({ where: { id } });
            return new NextResponse(null, { status: 204 });
        } catch (error) {
            console.error('Admin request DELETE error:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }, parseInt(id) || 0);
}
