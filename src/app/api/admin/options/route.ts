import {NextRequest, NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";
import {optionCreateSchema} from "@app/admin/options/validation";
import {strToSlug} from "@lib/str";
import {saveBase64File} from "@lib/file";
import {optionPath} from "@lib/uploadPaths";

export async function GET(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const {searchParams} = new URL(req.url);
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '10');
            const skip = Math.max(page - 1, 0) * limit;

            const [entities, total] = await prisma.$transaction([
                prisma.option.findMany({
                    skip,
                    take: limit,
                }),
                prisma.option.count(),
            ]);

            return NextResponse.json({
                data: entities,
                meta: {
                    page, limit, total, totalPages: Math.ceil(total / limit),
                }
            })
        } catch (error) {
            console.log(error)
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}


export async function POST(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const body = await req.json();
            const validationResult = optionCreateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            const data = validationResult.data;

            if (data.hash_tag && data.hash_tag.length) {
                data.hash_tag = strToSlug(data.hash_tag);
            }

            const entity = await prisma.option.create({data});

            if (body.newImage && body.newImage.length) {
                const src = await saveBase64File(body.newImage, optionPath(entity.id));
                await prisma.option.update({where: {id: entity.id}, data: {value: src}});
                entity.value = src;
            }

            return NextResponse.json(entity, {status: 201});
        } catch (error) {
            console.log(error)
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}
