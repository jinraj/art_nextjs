import React from 'react';
import CategoryCard from './components/CategoryCard'
import TitleLayout from './components/TitleLayout';
import { artType, categories } from './constants/meta';

export default function Home() {
  return (
    <div>
      <TitleLayout
        prefix="It is"
        title={artType.Home.name}
        quote={artType.Home.quotes[Math.floor(Math.random() * artType.Home.quotes.length)]}
      ></TitleLayout>
      <div className="flex flex-col items-center py-5">
        <CategoryCard listOfArtworks={categories} />
      </div>
    </div>
  );
}