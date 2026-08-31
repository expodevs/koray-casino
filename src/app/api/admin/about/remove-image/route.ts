import { NextRequest, NextResponse } from 'next/server';

import { withAdminAuthorized } from '@lib/authorized';
import { fullPublicPath, removeFile } from '@lib/file';

function getRelativeUploadPath(src: string): string | null {
    if (!src) return null;

    let pathname = src;

    if (src.startsWith('http://') || src.startsWith('https://')) {
        try {
            pathname = new URL(src).pathname;
        } catch {
            return null;
        }
    }

    const relativePath = pathname.replace(/^\/+/, '');

    if (!relativePath.startsWith('uploads/about/')) {
        return null;
    }

    return relativePath;
}

export async function POST(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {
            const body = await req.json();
            const src = body?.src;

            if (!src || typeof src !== 'string') {
                return NextResponse.json(
                    { success: false, message: 'src is required' },
                    { status: 400 },
                );
            }

            const relativePath = getRelativeUploadPath(src);

            if (!relativePath) {
                return NextResponse.json({ success: true });
            }

            const pathParts = relativePath.split('/').filter(Boolean);
            await removeFile(fullPublicPath(...pathParts));

            return NextResponse.json({ success: true });
        } catch (error) {
            console.error('about remove image error:', error);

            return NextResponse.json(
                { success: false, message: 'Remove failed' },
                { status: 500 },
            );
        }
    }, req);
}
