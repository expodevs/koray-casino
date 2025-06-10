import {NextRequest, NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";
import {categoryCardCreateSchema} from "@app/admin/categoryCards/validation";


export async function GET(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const {searchParams} = new URL(req.url);
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '10');
            const skip = Math.max(page - 1, 0) * limit;

            const [entities, total] = await prisma.$transaction([
                prisma.categoryCard.findMany({
                    skip,
                    take: limit,
                }),
                prisma.categoryCard.count(),
            ]);

            return NextResponse.json({
                data: entities,
                meta: {
                    page, limit, total, totalPages: Math.ceil(total / limit),
                }
            })
        } catch {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}


export async function POST(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const body = await req.json();
            const validationResult = categoryCardCreateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }


            const entity = await prisma.categoryCard.create({data: validationResult.data});
            return NextResponse.json(entity, {status: 201});
        } catch {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}
