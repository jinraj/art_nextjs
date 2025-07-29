'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

interface Feedback {
  id: string;
  quote: string;
  author: string;
  rating: number;
  avatar?: string; 
}

interface CustomerFeedbackSectionProps {
  overallRating: number;
  totalReviews: number;
  feedbacks: Feedback[];
}

export default function CustomerFeedbackSection({ overallRating, totalReviews, feedbacks }: CustomerFeedbackSectionProps) {

  // Function to render stars based on rating
  const renderStars = (rating: number, size: string = 'text-xl') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className={`text-yellow-400 ${size}`} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className={`text-yellow-400 ${size}`} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className={`text-gray-300 ${size}`} />);
    }
    return stars;
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.section
      className=" bg-gray-800 py-15 md:py-15 px-5 sm:px-6 lg:px-8 rounded-2xl mx-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="py-5 text-4xl md:text-4xl font-bold text-gray-100 mb-4">
            Customer Love
          </h2>
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="flex text-2xl">
              {renderStars(overallRating, 'text-xl')}
            </div>
            <span className="text-xl font-bold text-gray-100">{overallRating.toFixed(1)}</span>
          </div>
          <p className="text-gray-400 text-md">Based on {totalReviews} reviews</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {feedbacks.map((feedback) => (
            <motion.div
              key={feedback.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="bg-gray-50 p-8 rounded-xl shadow-md flex flex-col justify-between border border-gray-100"
            >
              <div>
                <div className="flex text-lg mb-4">
                    {feedback.rating ? renderStars(feedback.rating, 'text-xl') : renderStars(5, 'text-xl')}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  &ldquo;{feedback.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center">
                {feedback.avatar && (
                  <img
                    src={feedback.avatar}
                    alt={feedback.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                )}
                <span className="font-semibold text-gray-800">{feedback.author}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}