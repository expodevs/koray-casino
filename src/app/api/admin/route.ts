import {NextRequest, NextResponse} from "next/server";
import {withAdminAuthorized} from "@lib/authorized";

//todo: remove

export async function GET(req: NextRequest) {
        return NextResponse.json({data: 'OK', req: req.url}, {status: 200});
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {
            return NextResponse.json({data: 'OK', req: req.url}, {status: 200});
        } catch (error) {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req);
}
