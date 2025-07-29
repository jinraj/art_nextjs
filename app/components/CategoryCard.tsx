'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArtWork } from '../interfaces/artwork';
import { useRouter } from 'next/navigation';

interface CategoryCardProps {
  listOfArtworks?: ArtWork[];
  maxColumns?: number;
}

export default function CategoryCard({ listOfArtworks, maxColumns = 6 }: CategoryCardProps) {
  const router = useRouter();
  if (!listOfArtworks || listOfArtworks.length === 0) {
    return <div className="text-center text-gray-500">No artworks available</div>;
  }

  // Variants for the overall card (parent motion.div)
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        when: "beforeChildren", // Animate parent card first, then its children
        duration: 0.5,
      },
    },
    hover: { scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    tap: { scale: 0.97 },
  };

  // Variants for the outer layer's reveal animation
  const outerLayerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: 0.15, // Appears slightly after the main card
      },
    },
  };

  // Variants for the inner layer's reveal animation
  const innerLayerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: 0.3, // Appears after the outer layer
      },
    },
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`grid 
          grid-cols-1
          sm:grid-cols-1
          md:grid-cols-3
          lg:grid-cols-3
          xl:grid-cols-3
          gap-4`}
      >
        {listOfArtworks.map((img, i) => (
          <motion.div
            key={img.id + i}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => router.push(`/${img.title.toLowerCase().replace(/\s+/g, '-')}`)}
            variants={cardVariants} // Apply parent card animation
            initial="hidden"
            animate="visible"
            whileHover="hover" // Use named variants for whileHover/whileTap
            whileTap="tap"
          >
            {/* Outer Layer (farthest back, largest) */}
            <motion.div
              className="p-1 bg-gray-100 rounded-2xl shadow-lg relative" // Use orange-200
              variants={outerLayerVariants} // Apply its own reveal animation
            >
              {/* Middle Layer */}
              <motion.div
                className="p-2 bg-gray-50 rounded-2xl relative" // Use orange-400
                variants={innerLayerVariants} // Apply its own reveal animation
              >
                {/* Image Layer (frontmost) */}
                <div
                  className="h-85 w-70 sm:h-85 sm:w-70 md:h-70 md:w-50 lg:h-100 lg:w-75 flex items-center justify-center bg-gray-200 bg-cover bg-center rounded-2xl shadow-md"
                  style={{ backgroundImage: `url('${img.images[0]}')` }}
                />
              </motion.div>
            </motion.div>
            <span
              className="mt-4 px-2 text-base sm:text-md md:text-md font-semibold text-gray-800 text-center leading-tight line-clamp-2"
              title={img.title}
            >
              {img.title}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}