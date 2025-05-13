import {NextRequest, NextResponse} from 'next/server';
import prisma from '@lib/prisma-client';
import {withAdminAuthorized} from "@lib/authorized";
import {iconCardImageUpdateSchema} from "@app/admin/iconCardImages/validation";
import {fullPublicPath, removeFile, saveBase64File} from "@lib/file";
import {iconCardImagePath} from "@lib/uploadPaths";


type requestParams = { params: { id: string } };

async function removeOldImage(id: number) {
    const entity = await prisma.iconCardImage.findUnique({where:{id}});
    if (!entity || !entity.image.length) {
        return;
    }

    removeFile(fullPublicPath(entity.image));
}

export async function GET(req: Request, {params}: requestParams) {
    const {id} = await params
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
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, parseInt(id) || 0)
}


export async function PUT(req: NextRequest, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (req: NextRequest, id: number) => {
        try {
            const body = await req.json();
            const validationResult = iconCardImageUpdateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            if (!validationResult.data.image.length || body.newImage && body.newImage.length) {
                await removeOldImage(id);
            }

            const entity = await prisma.iconCardImage.update({
                where: {id},
                data: validationResult.data,
            });

            if (body.newImage && body.newImage.length) {
                const src = await saveBase64File(body.newImage, iconCardImagePath(entity.id));
                await prisma.iconCardImage.update({where: {id: entity.id}, data: {image: src}});
                entity.image = src;
            }


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

            await removeOldImage(id)

            await prisma.iconCardImage.delete({
                where: {id},
            });

            return new NextResponse(null, {status: 204});
        } catch (error) {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req, parseInt(id) || 0)
}



