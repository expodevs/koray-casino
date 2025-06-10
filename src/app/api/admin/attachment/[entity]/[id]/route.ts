import {withAdminAuthorized} from "@lib/authorized";
import {NextRequest, NextResponse} from "next/server";
import prisma from "@lib/prisma-client";


type requestParams = { params: Promise<{ id: string, entity: string}> };

export async function GET(req: NextRequest, {params}: requestParams) {
    const {id, entity} = await params
    return await withAdminAuthorized(async (id: number, entity: string, isFirst: boolean)=> {
        const attachments = await prisma.attachment.findMany({where: {entity, entity_id: id}, take: isFirst?1:undefined});
        if (!attachments.length) {
            return NextResponse.json({status: 404, statusText: "Not Found"});
        }

        if (isFirst) {
            return NextResponse.json(attachments[0]);
        }

        return NextResponse.json(attachments);
    }, parseInt(id)||0, entity, req.nextUrl.searchParams.has('first'))
}
