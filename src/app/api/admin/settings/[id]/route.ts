import {NextRequest, NextResponse} from 'next/server';
import prisma from '@lib/prisma-client';
import {withAdminAuthorized} from "@lib/authorized";
import {settingUpdateSchema} from "@app/admin/settings/validation";
import {settingPath} from "@lib/uploadPaths";
import {fullPublicPath, removeFile, saveBase64File} from "@lib/file";
import {strToSlug} from "@lib/str";
import { invalidateSettingsCache } from "@app/api/front/settings";

type requestParams = { params: Promise<{ id: string }> };

async function removeOldImage(id: number) {
    const entity = await prisma.setting.findUnique({where:{id}});
    if (!entity || !entity.value.length) {
        return;
    }

    removeFile(fullPublicPath(entity.value));
}


export async function GET(req: Request, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (id: number) => {
        try {

            const entity = await prisma.setting.findUnique({
                where: {id},
            });

            if (!entity) {
                return NextResponse.json({error: 'Setting not found'}, {status: 404});
            }

            return NextResponse.json(entity);
        } catch (error) {
            console.error(error);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, parseInt(id) || 0)
}


export async function PUT(req: NextRequest, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (req: NextRequest, id: number) => {
        try {
            const body = await req.json();
            const validationResult = settingUpdateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            const data = validationResult.data;

            data.code = strToSlug(data.code);

            if (!data.value || !data.value.length || data.newImage && data.newImage.length) {
                await removeOldImage(id);
            }

            if (await prisma.setting.findUnique({
                where: {
                    code: data.code,
                    NOT: {
                        id: id,
                    },
                }
            })) {
                return NextResponse.json({error: 'Code must be unique'}, {status: 400});
            }

            const newImage = data.newImage;
            delete data.newImage;

            const entity = await prisma.setting.update({
                where: {id},
                data,
            });

            if (newImage && newImage.length) {
                const src = await saveBase64File(newImage, settingPath(entity.id));
                await prisma.setting.update({where: {id: entity.id}, data: {value: src}});
                entity.value = src;
            }

            invalidateSettingsCache();

            return NextResponse.json(entity);

        } catch (error) {
            console.error(error);
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

            await prisma.setting.delete({
                where: {id},
            });

            invalidateSettingsCache();

            return new NextResponse(null, {status: 204});
        } catch (error) {
            console.error(error);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req, parseInt(id) || 0)
}
