import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ photoId: string }> }
) {
    try {
        const { photoId } = await params;
        const photosDir = path.join(process.cwd(), 'public/photos');
        const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.JPG', '.JPEG', '.PNG', '.GIF'];

        // Find the correct file extension
        for (const ext of extensions) {
            const filePath = path.join(photosDir, `${photoId}${ext}`);
            if (fs.existsSync(filePath)) {
                return NextResponse.json({ src: `/photos/${photoId}${ext}` });
            }
        }

        // If no image found, return 404
        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}