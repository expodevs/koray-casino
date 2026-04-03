import { NextRequest, NextResponse } from 'next/server';
import { fullPublicPath, removeFile } from '@lib/file';

function normalizeSrcForRemove(src: string): string {
    if (!src) return src;

    if (src.startsWith('http://') || src.startsWith('https://')) {
        try {
            const url = new URL(src);
            return url.pathname;
        } catch {
            return src;
        }
    }

    return src;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const src = body?.src;

        if (!src || typeof src !== 'string') {
            return NextResponse.json(
                { success: false, message: 'src is required' },
                { status: 400 }
            );
        }

        const normalizedSrc = normalizeSrcForRemove(src);
        const relativeSrc = normalizedSrc.replace(/^\/+/, '');
        const pathParts = relativeSrc.split('/').filter(Boolean);

        console.log('remove-image src:', src);
        console.log('remove-image normalizedSrc:', normalizedSrc);
        console.log('remove-image relativeSrc:', relativeSrc);
        console.log('remove-image pathParts:', pathParts);
        console.log('remove-image fullPublicPath:', fullPublicPath(...pathParts));

        await removeFile(fullPublicPath(...pathParts));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('tabs-nested remove image error:', error);

        return NextResponse.json(
            { success: false, message: 'Remove failed' },
            { status: 500 }
        );
    }
}
