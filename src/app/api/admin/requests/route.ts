import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma-client';
import { withAdminAuthorized } from '@lib/authorized';
import { Prisma } from '@prismaClient';

export async function GET(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {
            const { searchParams } = new URL(req.url);
            const page = Math.max(parseInt(searchParams.get('page') || '1'), 1);
            const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '25'), 1), 100);
            const q = (searchParams.get('q') || '').trim();
            const status = (searchParams.get('status') || '').trim();
            const skip = (page - 1) * limit;

            const where: Prisma.ContactRequestWhereInput = {
                ...(q
                    ? {
                        OR: [
                            { name: { contains: q } },
                            { email: { contains: q } },
                            { message: { contains: q } },
                        ],
                    }
                    : {}),
                ...(status ? { status } : {}),
            };

            const [entities, total] = await prisma.$transaction([
                prisma.contactRequest.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { created_at: 'desc' },
                }),
                prisma.contactRequest.count({ where }),
            ]);

            return NextResponse.json({
                data: entities,
                meta: {
                    page,
                    limit,
                    total,
                    totalPages: Math.max(Math.ceil(total / limit), 1),
                },
            });
        } catch (error) {
            console.error('Admin requests GET error:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }, req);
}
