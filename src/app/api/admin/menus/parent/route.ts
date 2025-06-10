import {NextResponse} from "next/server";
import {withAdminAuthorized} from "@lib/authorized";
import prisma from "@lib/prisma-client";


export async function GET() {
    return await withAdminAuthorized(async () => {
        try {
            return NextResponse.json(await prisma.menu.findMany({
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
            }))
        } catch {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    })
}

