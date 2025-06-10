import {NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";
import {OptionType} from "@prismaClient";

export async function GET() {
    return await withAdminAuthorized(async () => {
        try {
            return NextResponse.json(await prisma.option.findMany({
                where: {type: OptionType.card}
            }));
        } catch  {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    });
}
