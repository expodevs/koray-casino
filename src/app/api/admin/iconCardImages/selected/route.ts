import {NextRequest, NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";


export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const ids = searchParams.getAll('id').map(Number).filter(Boolean);
    return await withAdminAuthorized(async (ids: number[]) => {

        try {
            const entities = await prisma.iconCardImage.findMany({
                include: {icon_card: true},
                where: {
                    id: {
                        in: ids,
                    },
                },
                take: 200,
            });

            return NextResponse.json(entities)
        } catch  {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, ids)
}

