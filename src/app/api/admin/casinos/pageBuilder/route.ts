import {NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";

export async function GET() {
    return await withAdminAuthorized(async () => {
        try {
            return NextResponse.json(await prisma.casino.findMany({
                select: {
                    id: true,
                    name: true,
                    image: true,
                    referral_key: true
                }
            }));
        } catch (error) {
            console.log(error.message)
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    });
}
