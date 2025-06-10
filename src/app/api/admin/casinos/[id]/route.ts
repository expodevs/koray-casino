import {NextRequest, NextResponse} from 'next/server';
import prisma from '@lib/prisma-client';
import {withAdminAuthorized} from "@lib/authorized";
import {casinoUpdateSchema} from "@app/admin/casinos/validation";
import {fullPublicPath, removeFile, saveBase64File} from "@lib/file";
import {casinoPath} from "@lib/uploadPaths";
import {strToSlug} from "@lib/str";


type requestParams = { params: Promise<{ id: string }> };

async function removeOldImage(id: number) {
    const entity = await prisma.casino.findUnique({where:{id}});
    if (!entity || !entity.image.length) {
        return;
    }

    removeFile(fullPublicPath(entity.image));
}

export async function GET(req: Request, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (id: number) => {
        try {

            const entity = await prisma.casino.findUnique({
                where: {id},
                include: {
                    options: {
                        include: {
                            entity: true
                        }
                    }
                }
            });

            if (!entity) {
                return NextResponse.json({error: 'Casino not found'}, {status: 404});
            }

            return NextResponse.json(entity);
        } catch (err) {
            console.error(err);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, parseInt(id) || 0)
}


export async function PUT(req: NextRequest, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (req: NextRequest, id: number) => {
        try {
            const body = await req.json();
            const validationResult = casinoUpdateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            const data = structuredClone(validationResult.data);

            data.referral_key = strToSlug(data.referral_key);

            if (await prisma.casino.findFirst({
                where: {
                    referral_key: data.referral_key,
                    NOT: {
                        id: id,
                    },
                }
            })) {
                return NextResponse.json({error: 'Referral key must be unique'}, {status: 400});
            }

            if (!data.image || !data.image.length || data.newImage && data.newImage.length) {
                await removeOldImage(id);
            }

            const newImage = data.newImage;
            delete data.newImage;

            const options = structuredClone(data.options || []);
            delete data.options;

            const entity = await prisma.casino.update({
                where: {id},
                data: {...data, options: undefined},
            });

            if (options.length > 0) {
                await prisma.casinoOption.deleteMany({
                    where: { casino_id: id }
                });

                await Promise.all(options.map(option => {
                    return prisma.casinoOption.create({
                        data: {
                            casino_id: id,
                            option_id: option.option_id,
                            value: option.value
                        }
                    });
                }));
            }

            if (newImage && newImage.length) {
                const src = await saveBase64File(newImage, casinoPath(entity.id));
                await prisma.casino.update({where: {id: entity.id}, data: {image: src}});
                entity.image = src;
            }

            return NextResponse.json(entity);
        } catch (err) {
            console.error(err);
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

            await removeOldImage(id);

            await prisma.casinoOption.deleteMany({
                where: { casino_id: id }
            });

            await prisma.casino.delete({
                where: {id},
            });

            return new NextResponse(null, {status: 204});
        } catch (err) {
            console.error(err);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req, parseInt(id) || 0)
}
