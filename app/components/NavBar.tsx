import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center bg-transparent">
      <div className="flex items-center">
        <img src="/resources/images/wallpaper/imlogo1.png" alt="Logo" className="h-8 sm:h-12 w-8 sm:w-12" />
      </div>
      <div className="flex text-sm sm:text-base space-x-3 sm:space-x-7">
        <a href="/" className="text-gray-500 hover:text-black">Home</a>
        <a href="/paintings" className="text-gray-500 hover:text-black">Paintings</a>
        <a href="/photography" className="text-gray-500 hover:text-black">Photography</a>
        <a href="/decors" className="text-gray-500 hover:text-black">Decors</a>
        <a href="/about" className="text-gray-500 hover:text-black">About</a>
      </div>
    </nav>
  );
};

export default Navbar;