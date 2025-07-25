'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Paintings', path: '/paintings' },
    { name: 'Photography', path: '/photography' },
    { name: 'Decors', path: '/decors' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="flex justify-between items-center bg-trasparent px-5 py-1 rounded-full shadow-md backdrop-blur-md top-0 left-0 right-0 z-100">
      <div className="flex items-center">
        <img
          src="/resources/images/wallpaper/imlogo1.png"
          alt="Logo"
          className="h-8 sm:h-12 w-8 sm:w-12"
        />
      </div>
      <div className="flex text-sm sm:text-base space-x-3 sm:space-x-7">
        {navItems.map(({ name, path }) => {
          const isActive = pathname === path;
          return (
            <a
              key={name}
              href={path}
              className={`hover:text-black ${
                isActive ? 'text-black font-semibold' : 'text-gray-500'
              }`}
            >
              {name}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
