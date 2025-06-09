import {NextResponse} from 'next/server';
import prisma from '@lib/prisma-client';
import {withAdminAuthorized} from "@lib/authorized";
import {requestIdParams} from "@/@types/request";

export async function GET(req: Request, {params}: requestIdParams) {
    const {id} = await params
    return await withAdminAuthorized(async (req: NextRequest, id: string) => {
        try {

            const user = await prisma.user.findUnique({
                where: {id},
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                },
            });

            if (!user) {
                return NextResponse.json({error: 'User not found'}, {status: 404});
            }

            return NextResponse.json(user);
        } catch (error) {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req, id)
}
