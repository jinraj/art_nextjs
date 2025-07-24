import React from 'react';
import { motion } from 'framer-motion';


interface ArtWork {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  artType: string;
  medium?: string;
  isHidden?: boolean;
  isSold?: boolean;
}

interface ImageCardProps {
  listOfArtworks?: ArtWork[];
  maxColumns?: number;
}

export default function ImageCard({ listOfArtworks, maxColumns = 6 }: ImageCardProps) {
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

  return (
    <div className="flex justify-center items-center">
      <div className={`grid 
        grid-cols-2
        sm:grid-cols-3 
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-6
        gap-4 `}>
        {listOfArtworks.map((img, i) => (
<motion.div
            key={img.id + i}
            className="flex flex-col items-center cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >            <div
              className="h-43 w-32 sm:h-50 sm:w-38 md:h-70 md:w-50 lg:h-70 lg:w-50  flex items-center justify-center bg-gray-200 bg-cover bg-center rounded-3xl"
              style={{ backgroundImage: `url('${img.images[0]}')` }}
            />
            <span className="mt-2 text-sm text-center">{img.title}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
