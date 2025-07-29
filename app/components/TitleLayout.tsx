'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface TitleLayoutProps {
  prefix?: string;
  title: string;
  quote: string;
}

export default function TitleLayout({ prefix = "", title, quote }: TitleLayoutProps) {

  return (
    <div className="py-15 pt-30 md:py-20 md:pt-40 bg-cover bg-center flex flex-col items-center justify-center text-center">
      <motion.div
        id="title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-3xl sm:text-5xl italic text-gray-600 mr-2">{prefix} </span>
        <span className="text-5xl sm:text-7xl font-bold text-gray-900">{title}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="mt-8 px-4 max-w-4xl text-lg sm:text-lg text-gray-500 font-normal italic">
          “{quote}”
        </p>

      </motion.div>
    </div>
  );
}