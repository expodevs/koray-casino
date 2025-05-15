import {NextRequest, NextResponse} from 'next/server';
import prisma from '@lib/prisma-client';
import {withAdminAuthorized} from "@lib/authorized";
import {optionUpdateSchema} from "@app/admin/options/validation";
import {strToSlug} from "@lib/str";
import {fullPublicPath, removeFile, saveBase64File} from "@lib/file";
import {optionPath} from "@lib/uploadPaths";
import {OptionType} from "@prismaClient";

type requestParams = { params: { id: string } };

async function removeOldImage(id: number) {
    const entity = await prisma.option.findUnique({where:{id}});
    if (!entity || !entity.value.length) {
        return;
    }

    removeFile(fullPublicPath(entity.value));
}

export async function GET(req: Request, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (id: number) => {
        try {

            const entity = await prisma.option.findUnique({
                where: {id, type: OptionType.casino},
            });

            if (!entity) {
                return NextResponse.json({error: 'Option not found'}, {status: 404});
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
            const validationResult = optionUpdateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            const data = validationResult.data;

            if (!data.value || !data.value.length || body.newImage && body.newImage.length) {
                await removeOldImage(id);
            }

            if (data.hash_tag && data.hash_tag.length) {
                data.hash_tag = strToSlug(data.hash_tag);
            }

            const entity = await prisma.option.update({
                where: {id, type: OptionType.casino},
                data,
            });

            if (body.newImage && body.newImage.length) {
                const src = await saveBase64File(body.newImage, optionPath(entity.id));
                await prisma.option.update({where: {id: entity.id}, data: {value: src}});
                entity.value = src;
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

            await prisma.option.delete({
                where: {id, type: OptionType.casino},
            });

            return new NextResponse(null, {status: 204});
        } catch (error) {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req, parseInt(id) || 0)
}



