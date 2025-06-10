import {NextRequest, NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";
import {pageCreateSchema} from "@app/admin/pages/validation";
import {strToSlug} from "@lib/str";
import {BuildPage} from "@/@types/response";

export async function GET(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const {searchParams} = new URL(req.url);
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '10');
            const skip = Math.max(page - 1, 0) * limit;

            const [entities, total] = await prisma.$transaction([
                prisma.page.findMany({
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
                    skip,
                    take: limit,
                }),
                prisma.page.count(),
            ]);

            return NextResponse.json({
                data: entities,
                meta: {
                    page, limit, total, totalPages: Math.ceil(total / limit),
                }
            })
        } catch {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}


export async function POST(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const body = await req.json();
            const validationResult = pageCreateSchema.safeParse(body);

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
                }
            })) {
                return NextResponse.json({error: 'Slug must be unique'}, {status: 400});
            }

            const entity = await prisma.page.create({data});

            await prisma.buildPage.deleteMany({where: {page_id: entity.id}});
            await prisma.buildPage.createMany({
                data: body.buildsPage.map((buildPage: BuildPage) => ({
                    page_id: entity.id,
                    build_id: buildPage.build_id,
                    position: buildPage.position,
                    field_values: buildPage.field_values,
                }))
            });

            return NextResponse.json(entity, {status: 201});
        } catch {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}
