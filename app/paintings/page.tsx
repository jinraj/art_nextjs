'use client';

import React, { useEffect, useState } from 'react';
import TitleLayout from '../components/TitleLayout';
import ImageCard from '../components/ImageCard';
import { ArtWork } from '../interfaces/artwork'
import { artType } from '../constants/meta';

const Paintings = () => {
  const [paintings, setPaintings] = useState<ArtWork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch('/api/artwork', {
          method: 'GET',
        });

        if (!res.ok) throw new Error('Failed to fetch artworks');

        const data = await res.json();
        const artworks: ArtWork[] = Array.isArray(data) ? data : data?.artworks || [];

        const filtered = artworks.filter(item => item.artType === artType.Paintings);
        setPaintings(filtered);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div>
      <TitleLayout
        title={artType.Paintings}
        quote="Every art is imbued with a sense of calm and serenity. It holds a profound meaning and significance. So, feel the life in the meaningful artworks."
      />
      <div className="flex flex-col items-center py-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ImageCard listOfArtworks={paintings} />
        )}
      </div>
    </div>
  );
};

export default Paintings;
