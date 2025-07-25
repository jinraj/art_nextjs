'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArtWork } from '../../interfaces/artwork';
import { motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';

export default function PreviewArtworkPage() {
    const { id } = useParams();
    const router = useRouter();
    const [artwork, setArtwork] = useState<ArtWork | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState<number>(0);

    useEffect(() => {
        if (!id) return;

        const stored = localStorage.getItem('selectedArtwork');
        if (stored) {
            const parsed: ArtWork = JSON.parse(stored);
            if (parsed.id === id) {
                setArtwork(parsed);
                setSelectedImage(parsed.images[0] || null);
            } else {
                router.push('/paintings');
            }
        } else {
            router.push('/paintings');
        }
    }, [id, router]);

    const handleLike = async () => {
        console.log(`Liking artwork with ID: ${id}`);
        if (liked) return;
        try {
             const res = await fetch(`/api/artwork/${id}/like`, {
                method: 'PUT'
            });
            const data = await res.json();
            console.log('Response:', data);
            setLiked(true);
            setLikes(data.likes || likes + 1); // fallback in case API doesn’t return count
        } catch (err) {
            console.error('Error liking artwork:', err);
        }
    };

    if (!artwork) {
        return <div className="text-center text-gray-500 mt-10">Loading artwork...</div>;
    }

    return (
        <div className="relative max-w-7xl mx-auto p-6 mt-32 rounded-2xl border-1 border-gray-300">
            {/* Cancel Button */}
            <button
                onClick={() => router.back()}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-200 hover:bg-gray-300 shadow-md"
                title="Back"
            >
                {/* <FaTimes className="text-gray-800" /> */}
                <X className="w-6 h-6" />
            </button>

            <motion.div
                className="flex flex-col lg:flex-row gap-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div id="art" className="w-full lg:w-[65%]">
                    <div className="rounded-2xl overflow-hidden">
                        <img
                            src={selectedImage || ''}
                            alt={artwork.title}
                            className="w-full max-h-[700px] object-contain"
                        />
                    </div>

                    {artwork.images.length > 1 && (
                        <div className="flex gap-2 mt-4 flex-wrap justify-center">
                            {artwork.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index}`}
                                    className={`w-20 h-20 object-cover cursor-pointer rounded-lg border-b-2 ${selectedImage === img
                                        ? 'shadow-md shadow-gray-800 border-gray-600'
                                        : 'border-gray-50'
                                        }`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* ART DETAILS */}
                <div
                    id="artDetails"
                    className="w-full lg:w-[35%] space-y-6 bg-white/5 rounded-xl p-6 relative"
                >
                    <h1 className="text-3xl font-bold">{artwork.title}</h1>
                    <p className="text-gray-600">{artwork.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mt-4">
                        <div>
                            <span className="font-semibold">Dimensions:</span>
                            <br />
                            {artwork.dimension}
                        </div>
                        <div>
                            <span className="font-semibold">Medium:</span>
                            <br />
                            {artwork.medium}
                        </div>
                        <div>
                            <span className="font-semibold">Artist:</span>
                            <br />
                            {artwork.artistName}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleLike}
                            className={`p-2 rounded-full ${liked ? 'bg-red-500' : 'bg-gray-700'
                                } transition-colors`}
                        >
                            {/* <FaHeart className={`text-white ${liked ? 'animate-bounce' : ''}`} /> */}
                            <Heart className="text-white w-5 h-5" fill={liked ? 'white' : 'none'} />

                        </button>
                        {/* <span className="text-gray-700">{liked ? '' : 'Like this artwork'}</span> */}
                        <span className="text-gray-700">
                            {liked ? artwork.likes + 1 : `${artwork.likes > 1 ? artwork.likes : 'Like this artwork'}`}
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
