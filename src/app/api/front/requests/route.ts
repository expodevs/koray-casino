import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@lib/prisma-client';

const contactRequestSchema = z.object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    email: z.string().trim().email().max(191),
    message: z.string().trim().min(1, 'Question is required').max(5000),
    source: z.string().trim().max(100).optional().default('about-us'),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validation = contactRequestSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Please check the form fields.',
                    errors: validation.error.flatten().fieldErrors,
                },
                { status: 400 },
            );
        }

        const { name, email, message, source } = validation.data;

        await prisma.contactRequest.create({
            data: {
                name,
                email: email.toLowerCase(),
                message,
                source,
                status: 'new',
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Your question has been submitted.',
            },
            { status: 201 },
        );
    } catch (error) {
        console.error('Contact request POST error:', error);
        return NextResponse.json(
            { success: false, message: 'Unable to submit your question right now.' },
            { status: 500 },
        );
    }
}
