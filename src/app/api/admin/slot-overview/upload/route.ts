import { NextRequest, NextResponse } from 'next/server';
import { saveFile } from '@lib/file';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json(
                { success: false, message: 'File is required' },
                { status: 400 }
            );
        }

        const src = await saveFile({
            folderPath: 'uploads/slot-overview',
            file,
        });

        if (!src) {
            return NextResponse.json(
                { success: false, message: 'Failed to save file' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            src,
        });
    } catch (error) {
        console.error('slot-overview upload error:', error);

        return NextResponse.json(
            { success: false, message: 'Upload failed' },
            { status: 500 }
        );
    }
}
