import {NextRequest, NextResponse} from "next/server";
import {withAdminAuthorized} from "@lib/authorized";
import {removeAttachedId} from "@lib/Attachment/Attachment";


export async function DELETE(req: NextRequest) {
    return await withAdminAuthorized(async (id: number) => {
        try {
            await removeAttachedId(id);
            return new NextResponse(null, {status: 204});
        } catch (error) {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, parseInt((await req.json()).id)||0)
}
