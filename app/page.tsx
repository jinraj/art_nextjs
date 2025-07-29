// pages/Home.tsx
'use client'; // Ensure this is at the top if you're using App Router

import React from 'react';
import CategoryCard from './components/CategoryCard';
import TitleLayout from './components/TitleLayout';
import CustomerFeedback from './components/CustomerFeedback';
import { motion } from 'framer-motion';
import { artType, categories } from './constants/meta';
import MaterialsSection from './components/MaterialsSection';


// Sample Customer Feedback Data (keep this as is)
const customerFeedbacks = [
  { id: '1', quote: 'Absolutely stunning artwork! The colors are so vibrant and truly capture the essence. Highly recommend!', author: 'Anya Sharma', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '2', quote: 'The painting arrived perfectly packaged and even more beautiful in person. A true masterpiece for my living room.', author: 'Ben Carter', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '3', quote: 'Incredible talent! Jinraj truly brings unique perspectives to life. The video work is also top-notch.', author: 'Chloe Kim', rating: 4.5, avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: '4', quote: 'Fast delivery and excellent communication. The artwork exceeded my expectations. Will definitely be a returning customer!', author: 'David Lee', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
];
const totalRatingSum = customerFeedbacks.reduce((sum, fb) => sum + fb.rating, 0);
const overallAverageRating = totalRatingSum / customerFeedbacks.length;

// Framer Motion variants for section entry animations
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};


export default function Home() {

  return (
    <div className=" text-gray-800"> 
      {/* 1. Hero Section */}
      <TitleLayout
        prefix="It is"
        title={artType.Home.name}
        quote={artType.Home.quotes[Math.floor(Math.random() * artType.Home.quotes.length)]}
      />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-xl mx-auto"></div>

      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <CategoryCard listOfArtworks={categories} />
      </motion.section>

      <MaterialsSection />

      <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-xl mx-auto"></div>

      {/* Customer Feedback Section */}
      <CustomerFeedback
        overallRating={overallAverageRating}
        totalReviews={customerFeedbacks.length}
        feedbacks={customerFeedbacks.slice(0, 3)}
      />

      {/* Divider */}
      <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-xl mx-auto"></div>


      {/* Contact Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-900 text-white text-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-4xl font-bold mb-6 leading-tight">
          Ready to Bring Art into Your Life?
        </motion.h2>
        <motion.p variants={itemVariants} className="text-md md:text-md opacity-90 mb-10 max-w-2xl mx-auto">
          Whether you're looking for a unique piece, a custom commission, or just want to connect, I'd love to hear from you.
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/about"
            className="inline-block bg-white text-orange-900 px-5 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.section>


      {/* 7. Footer Placeholder */}
      <div id='footer' className='py-20 bg-gray-800 text-white text-center'>
        <p>&copy; {new Date().getFullYear()} Jinraj Jain. All rights reserved.</p>
      </div>
    </div >
  );
}