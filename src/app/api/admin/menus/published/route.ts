import {NextRequest, NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";

export async function GET(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const {searchParams} = new URL(req.url);
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '10');
            const skip = Math.max(page - 1, 0) * limit;

            const where = {published: true};

            const [menus, total] = await prisma.$transaction([
                prisma.menu.findMany({
                    select: {
                        id: true,
                        type: true,
                        published: true,
                        label: true,
                        link: true,
                        parent_id: true,
                        position: true,
                    },
                    where,
                    orderBy: {position: 'asc'},
                    skip,
                    take: limit,
                }),
                prisma.menu.count({where}),
            ]);

            return NextResponse.json({
                data: menus,
                meta: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                }
            });
        } catch (error) {
            return NextResponse.json(
                {error: 'Internal Server Error'},
                {status: 500}
            );
        }
    }, req)
}
