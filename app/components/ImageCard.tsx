'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArtWork } from '../interfaces/artwork';
import PreviewArtworkPage from './PreviewArtwork';

interface ImageCardProps {
  listOfArtworks?: ArtWork[];
}

export default function ImageCard({ listOfArtworks }: ImageCardProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtWork | null>(null);

  if (!listOfArtworks || listOfArtworks.length === 0) {
    return <div className="text-center text-gray-500">No artworks available</div>;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const handleClosePreview = useCallback(() => {
    setSelectedArtwork(null);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className={`grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-4 `}>
          {listOfArtworks.filter((img) => !img.isHidden).map((img, i) => (
            <motion.div
              key={img.id + i}
              className="flex flex-col cursor-pointer"
              variants={cardVariants}
              onClick={() => {
                setSelectedArtwork(img);
              }}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div
                className="h-60 w-45 sm:h-50 sm:w-38 md:h-70 md:w-50 lg:h-90 lg:w-70  flex items-center justify-center bg-gray-200 bg-cover bg-center rounded-2xl"
                style={{ backgroundImage: `url('${img.images[0]}')` }}
              />
              {/* <span className="mt-2 px-2 text-sm">{img.title}</span> */}
              <div className="mt-2 px-2 flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">{img.title}</span>
                <span className="text-gray-400 font-medium">INR.{img.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Artwork Preview --- */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-lg p-6 max-w-7xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 200 }}
            >
              <PreviewArtworkPage artwork={selectedArtwork} onClose={handleClosePreview} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};