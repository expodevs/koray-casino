import {NextRequest, NextResponse} from 'next/server';
import prisma from '@lib/prisma-client';
import {withAdminAuthorized} from "@lib/authorized";
import {menuUpdateSchema} from "@app/admin/menus/validation";
import { invalidateMenuCache } from "@app/api/front/menus";

type requestParams = { params: Promise<{ id: string }> };

export async function GET(req: Request, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (id: string) => {
        try {

            const menu = await prisma.menu.findUnique({
                where: {id: parseInt(id) || 0},
                select: {
                    id: true,
                    type: true,
                    published: true,
                    label: true,
                    link: true,
                    parent_id: true,
                    position: true,
                },
            });

            if (!menu) {
                return NextResponse.json({error: 'Menu not found'}, {status: 404});
            }

            return NextResponse.json(menu);
        } catch {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, id)
}


export async function PUT(req: NextRequest, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (req: NextRequest, id: number) => {
        try {
            const body = await req.json();
            const validationResult = menuUpdateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            const user = await prisma.menu.update({
                where: {id},
                data: validationResult.data,
            });

            invalidateMenuCache();

            return NextResponse.json(user);
        } catch {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req, parseInt(id) || 0)
}

export async function DELETE(req: NextRequest, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (req: NextRequest, id: number) => {
        try {

            if (!id) {
                return NextResponse.json({error: 'Bad request'}, {status: 400});
            }

            await prisma.menu.delete({
                where: {id},
            });

            invalidateMenuCache();

            return new NextResponse(null, {status: 204});
        } catch {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req, parseInt(id) || 0)
}
