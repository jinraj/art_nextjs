'use client';

import { useEffect, useState } from 'react';
import { ArtWork } from '../interfaces/artwork';
import { motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { useCallback } from 'react';
import Image from 'next/image';

interface PreviewArtworkPageProps {
  artwork: ArtWork;
  onClose: () => void;
}

export default function PreviewArtworkPage({ artwork, onClose }: PreviewArtworkPageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const [currentLikesCount, setCurrentLikesCount] = useState<number>(0);

  // --- Utility to manage liked status in local storage ---
  const getLikedArtworksFromLocalStorage = useCallback((): Set<string> => {
    try {
      const likedArtworksJSON = localStorage.getItem('likedArtworks');
      return likedArtworksJSON ? new Set(JSON.parse(likedArtworksJSON)) : new Set();
    } catch (e) {
      console.error("Failed to parse likedArtworks from localStorage", e);
      return new Set();
    }
  }, []);

  const updateLikedArtworksInLocalStorage = useCallback((artworkId: string, liked: boolean) => {
    const likedArtworks = getLikedArtworksFromLocalStorage();
    if (liked) {
      likedArtworks.add(artworkId);
    } else {
      likedArtworks.delete(artworkId);
    }
    localStorage.setItem('likedArtworks', JSON.stringify(Array.from(likedArtworks)));
  }, [getLikedArtworksFromLocalStorage]);

  // Effect to initialize state when a new artwork prop is received
  useEffect(() => {
    if (artwork) {
      setSelectedImage(artwork.images[0] || null);
      setCurrentLikesCount(artwork.likes || 0);

      // Check user's like status from local storage
      const likedArtworks = getLikedArtworksFromLocalStorage();
      setIsLikedByUser(likedArtworks.has(artwork.id));
    }
  }, [artwork, getLikedArtworksFromLocalStorage]); // Re-run when artwork prop changes

  const handleToggleLike = async () => {
    if (!artwork || !artwork.id) return;

    const artworkId = artwork.id;
    const newLikedStatus = !isLikedByUser;
    setIsLikedByUser(newLikedStatus);
    setCurrentLikesCount(prev => newLikedStatus ? prev + 1 : Math.max(0, prev - 1));

    try {
      const res = await fetch(`/api/artwork/${artworkId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        // Revert optimistic update on failure
        console.log("Reversing the like on failure");
        setIsLikedByUser(!newLikedStatus);
        setCurrentLikesCount(prev => newLikedStatus ? Math.max(0, prev - 1) : prev + 1);
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed to ${newLikedStatus ? 'like' : 'unlike'} artwork`);
      }

      const data = await res.json();
      console.log('API Response:', data);

      // Update actual likes count from API response, if provided
      if (typeof data.likes === 'number') {
        console.log("Update actual likes", data.likes);
        setCurrentLikesCount(data.likes);
      }

      // Update local storage to persist user's liked status across sessions
      updateLikedArtworksInLocalStorage(artworkId, newLikedStatus);

    } catch (err) {
      console.error(`Error while toggling like for artwork ${artworkId}:`, err);
      alert(`Could not complete action: ${(err as Error).message}`);
    }
  };

  if (!artwork) {
    return null;
  }

  return (
    <div className="relative max-w-7xl mx-auto mt-0 rounded-2xl">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-200 hover:bg-gray-300 shadow-md"
        title="Back"
      >
        <X className="w-6 h-6" />
      </button>

      <motion.div
        className="flex flex-col lg:flex-row gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div id="art" className="w-full lg:w-[65%]">
          <div className="rounded-2xl overflow-hidden">
            {selectedImage && (
              <div className="relative w-full max-h-[700px] aspect-[3/2] rounded-2xl overflow-hidden">
                <Image
                  src={selectedImage}
                  alt={artwork.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            )}
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

        <div
          id="artDetails"
          className="w-full lg:w-[35%] space-y-6 bg-white/5 rounded-xl p-6 relative"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{artwork.title}</h1>
            <p className="text-md text-gray-600 leading-relaxed">{artwork.description}</p>

            <div>
              <span className="text-gray-800 font-medium text-sm px-2 py-1 rounded-2xl bg-gray-600 text-white">INR {artwork.price}.00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm border border-gray-200 rounded-xl p-3">
            <div>
              <span className="text-gray-500">Dimensions</span>
              <p className="text-gray-800 font-medium">{artwork.dimension}</p>
            </div>
            <div>
              <span className="text-gray-500">Medium</span>
              <p className="text-gray-800 font-medium">{artwork.medium}</p>
            </div>
            <div>
              <span className="text-gray-500">Artist</span>
              <p className="text-gray-800 font-medium">{artwork.artistName}</p>
            </div>
            <div>
              <span className="text-gray-500">Sold</span>
              <p className="text-gray-800 font-medium">{artwork.isSold}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleLike}
              className={`p-2 rounded-full transition ${isLikedByUser ? 'bg-red-500' : 'bg-gray-700'}`}
              title={isLikedByUser ? 'Unlike this artwork' : 'Like this artwork'}
            >
              <Heart className="text-white w-5 h-5" fill={isLikedByUser ? 'white' : 'none'} />
            </button>
            <span className="text-gray-700 text-sm">
              {currentLikesCount} {currentLikesCount === 1 ? 'Like' : 'Likes'}
            </span>
          </div>


        </div>
      </motion.div>
    </div>
  );
}