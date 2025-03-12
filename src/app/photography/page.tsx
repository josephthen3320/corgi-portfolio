import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { TitleBlock } from '@/components/titleBlock';

// Define a type for the photo object
type Photo = {
    slug: string;
    src: string;
    alt: string;
    title: string;
    description: string;
    idc: string;
    width: number;
    height: number;
};

export default function Photography() {
    const photosDir = path.join(process.cwd(), 'public/photos');
    const filenames = fs.readdirSync(photosDir);

    // Map through the filenames and create a photo object with fallback properties
    const photos: Photo[] = filenames
        .map((filename) => {
            const extension = path.extname(filename);

            // Check if it's an image file
            if (['.jpg', '.jpeg', '.png', '.gif'].includes(extension.toLowerCase())) {
                return {
                    slug: filename.replace(extension, ''), // Remove file extension for the slug
                    src: `/photos/${filename}`, // Image source
                    alt: filename.replace(extension, '').replace(/[-_]/g, ' '), // Fallback alt text based on filename
                    title: filename.replace(extension, '').replace(/[-_]/g, ' '), // Fallback title based on filename
                    description: 'No description available', // Fallback description
                    idc: filename.replace(extension, ''), // Using filename as the id for URL
                    width: 720, // Default width (can be dynamically adjusted)
                    height: 480, // Default height (can be dynamically adjusted)
                };
            }
            return null; // Skip non-image files
        })
        .filter((photo): photo is Photo => photo !== null); // Remove null entries and assert type

    return (
        <>
            <TitleBlock
                title="Photography"
                subtitle="(n.) The art of making time stands still to be seen, felt, and remembered."
            />

            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
                    {photos.map((photo, index) => (
                        <div
                            key={photo.slug}
                            className="relative group"
                        >
                            <div className="relative group hover:brightness-150 transition duration-200 group-hover:shadow-lg hover:shadow-gray-900/90 border-2 border-zinc-500/20 hover:border-zinc-500/70 rounded-sm">
                                <Link href={`/photography/${photo.idc}`} scroll={false} className="grid place-content-center">
                                    <Image
                                        src={photo.src}
                                        alt={photo.alt}
                                        width={720}
                                        height={0}
                                        quality={80}
                                        className="rounded-sm object-cover w-full h-auto" // Ensures image covers the space while maintaining aspect ratio
                                        loading={index < 10 ? 'eager' : 'lazy'}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                                    />

                                    {/* Overlay background (semi-transparent) */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-80 transition duration-200 rounded-sm"></div>

                                    {/* Text overlay */}
                                    <div>
                                        <p className="text-xs absolute bottom-1 text-white px-2 transition duration-200 opacity-70 md:opacity-0 group-hover:opacity-75">
                                            {photo.title}
                                            {/*
                                            <span className="text-xs font-light line-clamp-1 block opacity-75">
                                                {photo.description}
                                            </span>
                                            */}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}