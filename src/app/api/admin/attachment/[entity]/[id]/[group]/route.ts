import {withAdminAuthorized} from "@lib/authorized";
import {NextRequest, NextResponse} from "next/server";
import prisma from "@lib/prisma-client";


export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string, entity: string, group: string}> }
) {
    const {id, entity, group} = await params
    return await withAdminAuthorized(async (id: number, entity: string, group: string, first: boolean)=> {
        const attachments = await prisma.attachment.findMany({where: {entity, entity_id: id, group}, take: first?1:undefined});
        if (!attachments.length) {
            return NextResponse.json({error: 'Not found'}, {status: 404});
        }

        if (first) {
            return NextResponse.json(attachments[0]);
        }

        return NextResponse.json(attachments);
    }, parseInt(id)||0, entity, group, request.nextUrl.searchParams.has('first'))
}
