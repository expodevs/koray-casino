import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@lib/prisma-client';

const subscriptionSchema = z.object({
    email: z.string().trim().email().max(191),
    source: z.string().trim().max(100).optional().default('about-us'),
    website: z.string().max(500).optional().default(''),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validation = subscriptionSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { success: false, message: 'Please enter a valid email address.' },
                { status: 400 },
            );
        }

        const { email, source, website } = validation.data;

        // Honeypot: bots usually fill hidden fields. Return success without writing anything.
        if (website.trim()) {
            return NextResponse.json({ success: true, message: 'Thanks for subscribing.' });
        }

        await prisma.subscription.upsert({
            where: { email: email.toLowerCase() },
            create: {
                email: email.toLowerCase(),
                source,
                is_active: true,
            },
            update: {
                source,
                is_active: true,
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Thanks! You are subscribed.',
        });
    } catch (error) {
        console.error('Subscription POST error:', error);
        return NextResponse.json(
            { success: false, message: 'Unable to subscribe right now.' },
            { status: 500 },
        );
    }
}
