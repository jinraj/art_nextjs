'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface TitleLayoutProps {
  prefix: string;
  title: string;
  quote: string;
}

export default function TitleLayout({ prefix = "", title, quote }: TitleLayoutProps) {
  return (
    <div className="py-8 pt-20 h-72 sm:h-96 bg-cover bg-center flex flex-col items-center justify-center text-center">
      <motion.div
        id="title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-3xl sm:text-5xl italic text-gray-700 mr-2">{prefix}</span>
        <span className="text-5xl sm:text-7xl font-extrabold text-gray-900">{title}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="mt-6 px-6 sm:px-16 max-w-4xl text-lg sm:text-xl italic text-gray-600">
          “{quote}”
        </p>
      </motion.div>
    </div>
  );
}
