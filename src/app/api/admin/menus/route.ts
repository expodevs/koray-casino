import {NextRequest, NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";
import {menuCreateSchema} from "@app/admin/menus/validation";
import { invalidateMenuCache } from "@app/api/front/menus";

export async function GET(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const {searchParams} = new URL(req.url);
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '10');
            const skip = Math.max(page - 1, 0) * limit;

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
                    skip,
                    take: limit,
                }),
                prisma.menu.count(),
            ]);

            return NextResponse.json({
                data: menus,
                meta: {
                    page, limit, total, totalPages: Math.ceil(total / limit),
                }
            })
        } catch (error) {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}


export async function POST(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const body = await req.json();
            const validationResult = menuCreateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            const menu = await prisma.menu.create({data: validationResult.data});

            invalidateMenuCache();

            return NextResponse.json(menu, {status: 201});
        } catch (error) {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}
