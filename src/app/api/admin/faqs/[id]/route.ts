import {NextRequest, NextResponse} from 'next/server';
import prisma from '@lib/prisma-client';
import {withAdminAuthorized} from "@lib/authorized";
import {faqUpdateSchema} from "@app/admin/faqs/validation";
import {strToSlug} from "@lib/str";

type requestParams = { params: Promise<{ id: string }> };

export async function GET(_, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (id: number) => {
        try {

            const entity = await prisma.faq.findUnique({
                where: {id},
            });

            if (!entity) {
                return NextResponse.json({error: 'Option not found'}, {status: 404});
            }

            return NextResponse.json(entity);
        } catch  {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, parseInt(id) || 0)
}


export async function PUT(req: NextRequest, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (req: NextRequest, id: number) => {
        try {
            const body = await req.json();
            const validationResult = faqUpdateSchema.safeParse(body);

            if (!validationResult.success) {
                return NextResponse.json(validationResult.error.format(), {status: 400});
            }

            const data = validationResult.data;

            if (data.hash_tag && data.hash_tag.length) {
                data.hash_tag = strToSlug(data.hash_tag);
            }

            const entity = await prisma.faq.update({
                where: {id},
                data,
            });

            return NextResponse.json(entity);
        } catch {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, req, parseInt(id) || 0)
}

export async function DELETE(_, {params}: requestParams) {
    const {id} = await params
    return await withAdminAuthorized(async (id: number) => {
        try {

            if (!id) {
                return NextResponse.json({error: 'Bad request'}, {status: 400});
            }

            await prisma.faq.delete({
                where: {id},
            });

            return new NextResponse(null, {status: 204});
        } catch {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }, parseInt(id) || 0)
}



