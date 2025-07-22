import React from 'react';

interface TitleLayoutProps {
  prefix: String;
  title: String;
  quote: String;
};

export default function TitleLayout({prefix = "", title, quote}: TitleLayoutProps) {
  return (
    <div className={`py-8 pt-20 h-48 sm:h-72 bg-cover bg-center`}>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div id="title">
          <span className="text-3xl sm:text-5xl italic mr-4">{prefix}</span>
          <span className="text-5xl sm:text-7xl font-extrabold">{title}</span>
        </div>
      </div>
    </div>
  )
};
