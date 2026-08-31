import { NextRequest, NextResponse } from 'next/server';

import { withAdminAuthorized } from '@lib/authorized';
import { saveFile } from '@lib/file';

const allowedMimeTypes = new Set([
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/gif',
    'image/svg+xml',
]);

const maxFileSize = 10 * 1024 * 1024;

export async function POST(req: NextRequest) {
    return await withAdminAuthorized(async (req: NextRequest) => {
        try {
            const formData = await req.formData();
            const file = formData.get('file');

            if (!(file instanceof File)) {
                return NextResponse.json(
                    { success: false, message: 'File is required' },
                    { status: 400 },
                );
            }

            if (!allowedMimeTypes.has(file.type)) {
                return NextResponse.json(
                    { success: false, message: 'Unsupported image type' },
                    { status: 400 },
                );
            }

            if (file.size > maxFileSize) {
                return NextResponse.json(
                    { success: false, message: 'Image is too large. Max size is 10 MB' },
                    { status: 400 },
                );
            }

            const src = await saveFile({
                folderPath: 'uploads/about',
                file,
            });

            if (!src) {
                return NextResponse.json(
                    { success: false, message: 'Failed to save file' },
                    { status: 400 },
                );
            }

            return NextResponse.json({
                success: true,
                src,
            });
        } catch (error) {
            console.error('about upload error:', error);

            return NextResponse.json(
                { success: false, message: 'Upload failed' },
                { status: 500 },
            );
        }
    }, req);
}
