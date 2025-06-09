import {NextRequest, NextResponse} from 'next/server';
import {getServerSession} from 'next-auth';
import {authOptions} from '@app/api/auth/[...nextauth]/route';
import prisma from '@lib/prisma-client'
import {userCreateSchema, userUpdateSchema} from '@app/admin/users/validation';
import bcrypt from "bcryptjs";
import {withAdminAuthorized} from "@lib/authorized";

export async function GET(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {
            const {searchParams} = new URL(req.url);
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '10');
            const skip = Math.max(page - 1, 0) * limit;

            const [users, total] = await prisma.$transaction([
                prisma.user.findMany({
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        createdAt: true,
                    },
                    skip,
                    take: limit,
                }),
                prisma.user.count(),
            ]);

            return NextResponse.json({
                data: users,
                meta: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            });
        } catch (error) {
            console.error(error);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}

export async function POST(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {
            const body = await req.json();
            const validationResult = userCreateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            if (await prisma.user.findUnique({where: {email: validationResult.data.email}})) {
                return NextResponse.json({error: 'Email address already registered'}, {status: 400});
            }

            const data = validationResult.data;
            data.password = await bcrypt.hash(body.password, parseInt(process.env.BCRYPT || '') || 10);
            const user = await prisma.user.create({data});

            return NextResponse.json(user, {status: 201});
        } catch (error) {
            console.error(error)
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}

export async function PUT(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const body = await req.json();
            const validationResult = userUpdateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            const data = {...validationResult.data};

            if (data.password) {
                data.password = await bcrypt.hash(data.password, parseInt(process.env.BCRYPT || '') || 10);
            } else {
                delete data.password;
            }

            const user = await prisma.user.update({
                where: {id: data.id},
                data,
            });

            return NextResponse.json(user);
        } catch (error) {
            console.error(error);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}

export async function DELETE(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const session = await getServerSession(authOptions);

            const {searchParams} = new URL(req.url);
            const id = searchParams.get('id');

            if (session.user.id === id) {
                return NextResponse.json({error: 'You can\'t delete yourself'}, {status: 400});
            }

            await prisma.user.delete({
                where: {id},
            });

            return new NextResponse(null, {status: 204});
        } catch (error) {
            console.error(error);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}
