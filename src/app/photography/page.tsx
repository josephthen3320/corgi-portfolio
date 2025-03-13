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
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                        <div
                            key={photo.slug}
                            className="relative group overflow-hidden rounded-lg"
                            style={{
                                aspectRatio: `${photo.width} / ${photo.height}`, // Maintain natural aspect ratio
                            }}
                        >
                            <Link href={`/photography/${photo.idc}`} scroll={false}>
                                {/* Image */}
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    width={photo.width}
                                    height={photo.height}
                                    quality={80}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading={index < 10 ? 'eager' : 'lazy'}
                                />

                                {/* Overlay for hover effect */}
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-80 transition"></div>

                                {/* Title appears only on hover */}
                                <p className="absolute bottom-2 left-2 right-2 text-white text-sm px-3 opacity-0 group-hover:opacity-100 transition duration-300">
                                    {photo.title
                                        .replace(/[-_]/g, ' ') // Replace hyphens/underscores with spaces
                                        .replace(/\b\w/g, (char) => char.toUpperCase())
                                    } {/* Capitalize first letter of each word */}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}