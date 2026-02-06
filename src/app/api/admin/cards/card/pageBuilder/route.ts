import { NextResponse } from "next/server";
import { withAdminAuthorized } from "@lib/authorized";
import prisma from "@lib/prisma-client";
import { CardType } from "@prismaClient";

export async function GET() {
    return await withAdminAuthorized(async () => {
        try {
            return NextResponse.json(
                await prisma.card.findMany({
                    where: { type: CardType.card },
                    orderBy: [{ position: "asc" }, { id: "asc" }],
                })
            );
        } catch {
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    });
}
