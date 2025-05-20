import {NextRequest, NextResponse} from "next/server";
import prisma from "@lib/prisma-client";
import {withAdminAuthorized} from "@lib/authorized";
import {casinoCreateSchema} from "@app/admin/casinos/validation";
import {saveBase64File} from "@lib/file";
import {casinoPath} from "@lib/uploadPaths";
import {strToSlug} from "@lib/str";


export async function GET(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const {searchParams} = new URL(req.url);
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '10');
            const skip = Math.max(page - 1, 0) * limit;

            const [entities, total] = await prisma.$transaction([
                prisma.casino.findMany({
                    skip,
                    take: limit,
                }),
                prisma.casino.count(),
            ]);

            return NextResponse.json({
                data: entities,
                meta: {
                    page, limit, total, totalPages: Math.ceil(total / limit),
                }
            })
        } catch (err) {
            console.error(err);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}


export async function POST(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {

            const body = await req.json();
            const validationResult = casinoCreateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            const data = validationResult.data;

            data.referral_key = strToSlug(data.referral_key);

            if (await prisma.casino.findUnique({
                where: {
                    referral_key: data.referral_key,
                }
            })) {
                return NextResponse.json({error: 'Referral key must be unique'}, {status: 400});
            }

            const newImage = data.newImage;
            delete data.newImage;

            const options = data.options || [];
            delete data.options;

            const entity = await prisma.casino.create({data});

            if (options.length > 0) {
                await Promise.all(options.map(option => {
                    return prisma.casinoOption.create({
                        data: {
                            casino_id: entity.id,
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

            return NextResponse.json(entity, {status: 201});
        } catch (err) {
            console.error(err);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req)
}
