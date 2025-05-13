import {NextRequest, NextResponse} from 'next/server';
import prisma from '@lib/prisma-client';
import {withAdminAuthorized} from "@lib/authorized";
import {settingUpdateSchema} from "@app/admin/settings/validation";
import {settingPath} from "@lib/uploadPaths";
import {fullPublicPath, removeFile, saveBase64File} from "@lib/file";

type requestParams = { params: { id: string } };

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
                select: {
                    id: true,
                    label: true,
                    code: true,
                    input_type: true,
                    value: true,
                },
            });

            if (!entity) {
                return NextResponse.json({error: 'Setting not found'}, {status: 404});
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
            const validationResult = settingUpdateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            if (!validationResult.data.value || !validationResult.data.value.length || body.newImage && body.newImage.length) {
                await removeOldImage(id);
            }

            if (await prisma.setting.findUnique({
                where: {
                    code: validationResult.data.code,
                    NOT: {
                        id: id,
                    },
                }
            })) {
                return NextResponse.json({error: 'Code must be unique'}, {status: 400});
            }


            const entity = await prisma.setting.update({
                where: {id},
                data: validationResult.data,
            });

            if (body.newImage && body.newImage.length) {
                const src = await saveBase64File(body.newImage, settingPath(entity.id));
                await prisma.setting.update({where: {id: entity.id}, data: {value: src}});
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

            await prisma.setting.delete({
                where: {id},
            });

            return new NextResponse(null, {status: 204});
        } catch (error) {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req, parseInt(id) || 0)
}



