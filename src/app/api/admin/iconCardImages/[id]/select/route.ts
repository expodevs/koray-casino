import {NextRequest, NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";

type requestParams = { params: { id: string } };

export async function GET(req: Request, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (id: number) => {

        try {
            const entities = await prisma.iconCardImage.findMany({
                where: {
                    icon_card_id: id,
                },
                take: 200,
            });

            return NextResponse.json(entities)
        } catch (error) {
            console.log(error)
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, parseInt(id)||0)
}

