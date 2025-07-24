import React from 'react';
import CategoryCard from './components/CategoryCard'
import TitleLayout from './components/TitleLayout';
import { categories } from './constants/meta';

export default function Home() {
  return (
    <div>
      <TitleLayout
        prefix="It is"
        title="Meaningful"
        quote="Every art is imbued with a sense of calm and serenity. It holds a profound meaning and significance. So, feel the life in the meaningful artworks."
      ></TitleLayout>
      <div className="flex flex-col items-center py-5">
        <CategoryCard listOfArtworks={categories} />
      </div>
    </div>
  );
}