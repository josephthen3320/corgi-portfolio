'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function PhotoPage({ params }: { params: Promise<{ photoId: string }> }) {
    const { photoId } = use(params);
    const router = useRouter();
    const [photoSrc, setPhotoSrc] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch the correct image path
    useEffect(() => {
        const fetchPhotoSrc = async () => {
            try {
                const res = await fetch(`/api/photo/${photoId}`);
                if (!res.ok) throw new Error('Image not found');
                const data = await res.json();
                setPhotoSrc(data.src);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPhotoSrc();
    }, [photoId]);

    if (!photoSrc) {
        return <div className="text-white text-center mt-20">Fetching the image for you! <br/> ദ്ദി •⩊• ) </div>;
    }

    return (
        <div className="flex flex-col items-center justify-center bg-black">
            {/* Header with Back Button */}
            <div className="w-full py-3 px-5 flex justify-between items-center text-white">
                <button onClick={() => router.back()} className="px-3 py-1 bg-gray-950 rounded hover:bg-gray-800 cursor-pointer">
                    ← Back
                </button>
                <span className="text-lg">
                    {photoId
                        .replace(/[-_]/g, ' ') // Replace hyphens/underscores with spaces
                        .replace(/\b\w/g, (char) => char.toUpperCase())} {/* Capitalize first letter of each word */}
                </span>
                <span>{photoSrc}</span>
                <div className="w-16" /> {/* Placeholder to balance flex spacing */}
            </div>

            {/* Main Image (75% Screen Height) */}
            <div className="flex items-center justify-center h-[60vh]">
                <Image
                    src={photoSrc}
                    alt={photoId.replace(/[-_]/g, ' ')}
                    width={1080}
                    height={720}
                    className="h-[60vh] w-auto cursor-pointer transition-transform duration-300 hover:scale-[102%] border-2 border-gray-800"
                    onClick={() => setIsModalOpen(true)}
                />
            </div>

            {/* Modal for Full-Resolution Image */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
                    onClick={() => setIsModalOpen(false)}
                    onKeyDown={(e) => e.key === 'Escape' && setIsModalOpen(false)}
                    tabIndex={0}
                >
                    <Image
                        src={photoSrc}
                        alt={photoId.replace(/[-_]/g, ' ')}
                        width={1920}
                        height={1080}
                        className="max-h-screen w-auto"
                    />
                </div>
            )}
        </div>
    );
}
