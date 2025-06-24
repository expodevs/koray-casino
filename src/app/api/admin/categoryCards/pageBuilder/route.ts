import {NextResponse} from "next/server";
import {withAdminAuthorized} from "@lib/authorized";
import prisma from "@lib/prisma-client";


export async function GET() {
    return await withAdminAuthorized(async () => {
        try {
            return NextResponse.json(await prisma.categoryCard.findMany());
        } catch {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    });
}
