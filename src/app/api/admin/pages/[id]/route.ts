import {NextRequest, NextResponse} from 'next/server';
import prisma from '@lib/prisma-client';
import {withAdminAuthorized} from "@lib/authorized";
import {pageUpdateSchema} from "@app/admin/pages/validation";
import {strToSlug} from "@lib/str";

type requestParams = { params: { id: string } };

export async function GET(req: Request, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (id: number) => {
        try {

            const entity = await prisma.page.findUnique({
                where: {id},
                select: {
                    id: true,
                    label: true,
                    slug: true,
                    published: true,
                    meta_title: true,
                    meta_description: true,
                    meta_keywords: true,
                    meta_noindex_nofollow: true,
                },
            });

            if (!entity) {
                return NextResponse.json({error: 'Option not found'}, {status: 404});
            }

            return NextResponse.json(entity);
        } catch (error) {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    },  parseInt(id) || 0)
}


export async function PUT(req: NextRequest, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (req: NextRequest, id: number) => {
        try {
            const body = await req.json();
            const validationResult = pageUpdateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            const data = validationResult.data;
            if (!data.meta_title?.trim().length) {
                data.meta_title = data.label;
            }
            if (!data.slug?.trim().length) {
                data.slug = strToSlug(data.label);
            }else {
                data.slug = strToSlug(data.slug);
            }


            if (await prisma.page.findUnique({
                where: {
                    slug: data.slug,
                    NOT: {
                        id: id,
                    },
                }
            })) {
                return NextResponse.json({error: 'Slug must be unique'}, {status: 400});
            }

            const entity = await prisma.page.update({
                where: {id},
                data,
            });

            return NextResponse.json(entity);
        } catch (error) {
            console.log(error)
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req, parseInt(id) || 0)
}

export async function DELETE(req: NextRequest, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (req: NextRequest, id: number) => {
        try {

            if (!id) {
                return NextResponse.json({error: 'Bad request'}, {status: 400});
            }

            await prisma.page.delete({
                where: {id},
            });

            return new NextResponse(null, {status: 204});
        } catch (error) {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req, parseInt(id) || 0)
}



