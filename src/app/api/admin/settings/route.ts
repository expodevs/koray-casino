import {NextRequest, NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";
import {settingCreateSchema} from "@app/admin/settings/validation";
import {attachedBase64File, removeAttachedFile} from "@lib/Attachment/Attachment";
import {optionPath, settingParams, settingPath} from "@lib/uploadPaths";
import {InputType} from "@prismaClient";
import {saveBase64File} from "@lib/file";

export async function GET(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const {searchParams} = new URL(req.url);
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '10');
            const skip = Math.max(page - 1, 0) * limit;

            const [entities, total] = await prisma.$transaction([
                prisma.setting.findMany({
                    select: {
                        id: true,
                        input_type: true,
                        label: true,
                        code: true,
                        value: true,
                    },
                    skip,
                    take: limit,
                }),
                prisma.setting.count(),
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
            const validationResult = settingCreateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            const entity = await prisma.setting.create({data: validationResult.data});

            if (validationResult.data.input_type === InputType.image && body.newImage.length) {
                validationResult.data.value = '';
                const src = await saveBase64File(body.newImage, settingPath(entity.id));
                await prisma.setting.update({where: {id: entity.id}, data: {value: src}});
                entity.value = src;
            }

            return NextResponse.json(entity, {status: 201});

        } catch (error) {
            console.log(error)
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}
