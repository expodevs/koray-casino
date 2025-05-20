import {NextRequest, NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";


export async function POST(req: Request) {
    const {ids} = await req.json();
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
        } catch (error) {
            console.log(error)
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, ids.map(Number).filter(Boolean))
}

