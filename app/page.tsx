import React from 'react';
import CategoryCard from './components/CategoryCard'
import TitleLayout from './components/TitleLayout';


const categories = [
  {
    id: 1,
    label: 'Paintings',
    images: ['/resources/images/paintings/image4_1.jpg'],
  },
  {
    id: 2,
    label: 'Photography',
    images: ['/resources/images/photography/photo1_1.jpg'],
  },
  {
    id: 3,
    label: 'Decors',
    images: ['/resources/images/paintings/image3_1.jpg'],
  },
  {
    id: 4,
    label: 'Artifacts',
    images: ['/resources/images/decors/home0.jpg'],
  }
];

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