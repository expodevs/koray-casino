import {NextRequest, NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";

type requestParams = { params: Promise<{ icon_card_id: string }> };

export async function GET(req: Request, {params}: requestParams) {
    const {icon_card_id} = await params
    return await withAdminAuthorized(async (icon_card_id: number) => {

        try {
            const entities = await prisma.iconCardImage.findMany({
                where: {
                    icon_card_id: icon_card_id,
                },
                take: 200,
            });

            return NextResponse.json(entities)
        } catch (error) {
            console.log(error)
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, parseInt(icon_card_id)||0)
}

