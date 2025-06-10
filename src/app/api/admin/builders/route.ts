import {NextResponse} from "next/server";
import {withAdminAuthorized} from "@lib/authorized";


export async function GET() {
    return await withAdminAuthorized(async () => {
        try {
            return NextResponse.json(await prisma.builder.findMany());
        } catch {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    });
}
