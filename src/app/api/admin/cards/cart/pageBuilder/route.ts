import {NextResponse} from "next/server";
import {withAdminAuthorized} from "@lib/authorized";


export async function GET() {
    return await withAdminAuthorized(async () => {
        try {
            return NextResponse.json(await prisma.card.findMany({
                where: {
                    type: 'cart'
                },
            }));
        } catch (error) {
            console.log(error.message)
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    });
}
