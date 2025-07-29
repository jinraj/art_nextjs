'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';


const Navbar: React.FC = () => {
  const pathname = usePathname();

  const leftNavItems = [
    { name: 'Paintings', path: '/paintings' },
    { name: 'Photography', path: '/photography' }
  ];

  const rightNavItems = [
    { name: 'Decors', path: '/decors' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="flex justify-between items-center bg-transparent py-2 rounded-full backdrop-blur-md top-0 left-0 right-0 z-100">
      {/* Left Nav */}
      <div className="flex-1 flex justify-evenly text-sm sm:text-sm">
        {leftNavItems.map(({ name, path }) => {
          const isActive = pathname === path;
          return (
            <a
              key={name}
              href={path}
              className={`hover:text-black ${isActive ? 'text-black font-semibold' : 'text-gray-500'
                }`}
            >
              {name}
            </a>
          );
        })}
      </div>

      {/* Logo */}
      <div className="flex justify-center items-center">
  <Link href="/">
    <motion.img
      src="/resources/images/wallpaper/imlogo1.png"
      alt="Logo"
      className="h-8 sm:h-12 w-8 sm:w-12 cursor-pointer"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1, rotate: 2 }}
      whileTap={{ scale: 0.9, rotate: -5 }}
    />
  </Link>
</div>

      {/* Right Nav */}
      <div className="flex-1 flex justify-evenly text-sm sm:text-sm">
        {rightNavItems.map(({ name, path }) => {
          const isActive = pathname === path;
          return (
            <a
              key={name}
              href={path}
              className={`hover:text-black ${isActive ? 'text-black font-semibold' : 'text-gray-500'
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
