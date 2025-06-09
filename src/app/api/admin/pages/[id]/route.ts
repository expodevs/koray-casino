import {NextRequest, NextResponse} from 'next/server';
import prisma from '@lib/prisma-client';
import {withAdminAuthorized} from "@lib/authorized";
import {pageUpdateSchema} from "@app/admin/pages/validation";
import {strToSlug} from "@lib/str";
import {BuildPage} from "@/@types/response";

type requestParams = { params: { id: string } };

export async function GET(req: Request, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (id: number) => {
        try {

            const entity = await prisma.page.findUnique({
                where: {id},
                include: {
                    builds: true,
                }
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

            await prisma.buildPage.deleteMany({where: {page_id: entity.id}});
            await prisma.buildPage.createMany({
                data: body.buildsPage.map((buildPage: BuildPage) => ({
                    page_id: entity.id,
                    build_id: buildPage.build_id,
                    position: buildPage.position,
                    field_values: buildPage.field_values,
                }))
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



