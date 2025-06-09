import {NextRequest, NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";
import {iconCardImageCreateSchema} from "@app/admin/iconCardImages/validation";
import {saveBase64File} from "@lib/file";
import {iconCardImagePath} from "@lib/uploadPaths";


export async function GET(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const {searchParams} = new URL(req.url);
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '10');
            const skip = Math.max(page - 1, 0) * limit;

            const [entities, total] = await prisma.$transaction([
                prisma.iconCardImage.findMany({
                    include: {icon_card: true,},
                    skip,
                    take: limit,
                }),
                prisma.iconCardImage.count(),
            ]);

            return NextResponse.json({
                data: entities,
                meta: {
                    page, limit, total, totalPages: Math.ceil(total / limit),
                }
            })
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
            const validationResult = iconCardImageCreateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            const data = validationResult.data;
            const newImage = data.newImage;
            delete data.newImage;

            const entity = await prisma.iconCardImage.create({data});

            if (newImage && newImage.length) {
                const src = await saveBase64File(newImage, iconCardImagePath(entity.id));
                await prisma.iconCardImage.update({where: {id: entity.id}, data: {image: src}});
                entity.image = src;
            }

            return NextResponse.json(entity, {status: 201});
        } catch (error) {
            console.error(error);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}
