'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArtWork } from '../interfaces/artwork';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CategoryCardProps {
  listOfArtworks?: ArtWork[];
  maxColumns?: number;
}

export default function CategoryCard({ listOfArtworks, maxColumns = 6 }: CategoryCardProps) {
  const router = useRouter();
  if (!listOfArtworks || listOfArtworks.length === 0) {
    return <div className="text-center text-gray-500">No artworks available</div>;
  }

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
        {/*  */}
        {listOfArtworks.map((img, i) => (
          <motion.div
            key={img.id + i}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => router.push(`/${img.title.toLowerCase().replace(/\s+/g, '-')}`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="p-1 bg-gray-100 rounded-2xl shadow-lg relative" >
              <div className="p-2 bg-gray-50 rounded-2xl relative">
            <div className="rounded-2xl shadow-lg overflow-hidden w-[280px] h-[400px]">
              <Image
                src={img.images[0]}
                alt={img.title}
                width={280}
                height={400}
                className="object-cover w-full h-full"
                priority={i < 6}
              />
            </div>
            </div>
            </div>
            <span className="mt-2 text-center font-semibold text-gray-800 text-base leading-tight line-clamp-2">
              {img.title}
            </span>
          </motion.div>

        ))}
      </div>
    </div>
  );
}