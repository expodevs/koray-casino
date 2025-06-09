import {NextRequest, NextResponse} from 'next/server';
import prisma from '@lib/prisma-client';
import {withAdminAuthorized} from "@lib/authorized";
import {iconCardImageUpdateSchema} from "@app/admin/iconCardImages/validation";
import {fullPublicPath, removeFile, saveBase64File} from "@lib/file";
import {iconCardImagePath} from "@lib/uploadPaths";


type requestParams = { params: { icon_card_id: string } };

async function removeOldImage(id: number) {
    const entity = await prisma.iconCardImage.findUnique({where:{id}});
    if (!entity || !entity.image.length) {
        return;
    }

    removeFile(fullPublicPath(entity.image));
}

export async function GET(req: Request, {params}: requestParams) {
    const {icon_card_id} = await params
    return await withAdminAuthorized(async (id: number) => {
        try {

            const entity = await prisma.iconCardImage.findUnique({
                include: {icon_card: true,},
                where: {id},
            });

            if (!entity) {
                return NextResponse.json({error: 'Icon Card not found'}, {status: 404});
            }

            return NextResponse.json(entity);
        } catch (error) {
            console.error(error);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, parseInt(icon_card_id) || 0)
}


export async function PUT(req: NextRequest, {params}: requestParams) {
    const {icon_card_id} = await params
    return await withAdminAuthorized(async (req: NextRequest, id: number) => {
        try {
            const body = await req.json();
            const validationResult = iconCardImageUpdateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            const data = validationResult.data;

            if (!data.image.length || data.newImage && data.newImage.length) {
                await removeOldImage(id);
            }

            const newImage = data.newImage;
            delete data.newImage;

            const entity = await prisma.iconCardImage.update({
                where: {id},
                data,
            });

            if (newImage && newImage.length) {
                const src = await saveBase64File(newImage, iconCardImagePath(entity.id));
                await prisma.iconCardImage.update({where: {id: entity.id}, data: {image: src}});
                entity.image = src;
            }


            return NextResponse.json(entity);
        } catch (error) {
            console.error(error);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req, parseInt(icon_card_id) || 0)
}

export async function DELETE(req: NextRequest, {params}: requestParams) {
    const {icon_card_id} = await params
    return await withAdminAuthorized(async (req: NextRequest, id: number) => {
        try {

            if (!id) {
                return NextResponse.json({error: 'Bad request'}, {status: 400});
            }

            await removeOldImage(id)

            await prisma.iconCardImage.delete({
                where: {id},
            });

            return new NextResponse(null, {status: 204});
        } catch (error) {
            console.error(error);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req, parseInt(icon_card_id) || 0)
}
