import {NextRequest, NextResponse} from "next/server";
import {withAdminAuthorized} from "@lib/authorized";
import prisma from "@lib/prisma-client";


export async function GET(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {
            return NextResponse.json({
                data: await prisma.menu.findMany({
                    select: {
                        id: true,
                        type: true,
                        published: true,
                        label: true,
                        link: true,
                        parent_id: true,
                        position: true,
                    },
                    where: {parent_id: null}
                }),
            })
        } catch (error) {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}

