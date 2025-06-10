import {NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";


export async function GET() {
    return await withAdminAuthorized(async () => {
        try {
            const entities = await prisma.iconCard.findMany({
                select: {id: true, label: true,},
                take: 200,
            });

            return NextResponse.json(entities)
        } catch (error) {
            console.log(error)
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    })
}

