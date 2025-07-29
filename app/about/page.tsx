'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaPaintBrush, FaCamera, FaGlobeAsia } from 'react-icons/fa';
import { FaEnvelope, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';
import TitleLayout from '../components/TitleLayout';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen text-gray-800">
        <TitleLayout
          prefix="Hi, I'm "
          title="Jinraj Jain"
          quote="A passionate artist, tech-savvy creator, and wanderer—crafting meaningful visuals and stories through paintings, pixels, and moments."
        />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-xl mx-auto"></div>

      {/* About Me Story Section */}
      <motion.section
        className="py-8 md:py-10 px-6 max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-4xl font-bold mb-8 leading-tight">
          My Journey & Philosophy
        </motion.h2>
        <motion.p variants={itemVariants} className="text-md md:text-md text-gray-700 leading-relaxed mb-6">
          I believe art is a conversation, a bridge between the unseen and the tangible. My work spans from the tactile strokes of acrylic on canvas to the intricate dance of pixels in digital creations. Each piece is a reflection of my curiosity, my travels, and the stories I encounter.
        </motion.p>
        <motion.p variants={itemVariants} className="text-md md:text-md text-gray-700 leading-relaxed">
          Driven by a desire to explore and innovate, I constantly seek new mediums and perspectives. Whether it's capturing a fleeting moment through a lens or building immersive digital experiences, my goal remains the same: to create something that resonates, inspires, and invites connection.
        </motion.p>
      </motion.section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-xl mx-auto"></div>


      {/* What I Love */}
      <motion.section
        className="py-10 mx-5 my-15 md:mx-20 rounded-3xl md:py-15 px-6 bg-gray-800 text-white" // Background color and default text color set here
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-4xl font-bold text-center mb-16 leading-tight">
          What Ignites My Passion
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <FaPaintBrush size={36} />,
              title: 'Acrylic Portraits',
              desc: 'Capturing emotion and soul on canvas with vibrant colors and expressive brushwork, bringing stories to life.',
            },
            {
              icon: <FaCamera size={36} />,
              title: 'Videography & Editing',
              desc: 'Crafting compelling narratives through dynamic visuals and precise editing, transforming raw footage into captivating stories.',
            },
            {
              icon: <FaGlobeAsia size={36} />,
              title: 'Travel & Culture',
              desc: 'Drawing profound inspiration from diverse cultures and breathtaking landscapes, enriching my artistic perspective.',
            },
          ].map((skill, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="rounded-2xl p-8 text-left"
            >
              <div className="text-white mb-6">{skill.icon}</div> 
              <h4 className="font-bold text-2xl mb-3 text-white">{skill.title}</h4>
              <p className="text-gray-300 text-md leading-relaxed">{skill.desc}</p> 
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="py-5 md:py-10 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-4xl font-bold text-center mb-16 leading-tight">
          Let’s Connect
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {[
            {
              icon: <FaEnvelope size={28} />,
              title: 'Email',
              value: 'jinrajjain@example.com',
              href: 'mailto:jinrajjain@example.com',
            },
            {
              icon: <FaMapMarkerAlt size={28} />,
              title: 'Location',
              value: 'Bangalore, India',
              href: '#',
            },
            {
              icon: <FaInstagram size={28} />,
              title: 'Instagram',
              value: '@art.by.jinraj',
              href: 'https://instagram.com/art.by.jinraj',
            },
          ].map((card, idx) => (
            <motion.a
              key={idx}
              href={card.href}
              target={card.href !== '#' ? "_blank" : "_self"}
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -5, color: '#4F46E5' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="flex flex-col items-center text-center p-6 rounded-xl group"
            >
              <div className="text-gray-500 mb-4 transition-colors duration-200 group-hover:text-indigo-600">{card.icon}</div>
              <h4 className="font-semibold text-xl mb-1">{card.title}</h4>
              <p className="text-gray-600 text-md">{card.value}</p>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto bg-gray-50 p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Message sent! (Hook to backend here)");
            }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 w-full border-b border-gray-300 focus:border-indigo-500 focus:ring-0 px-0 py-2 bg-transparent text-lg placeholder-gray-500 focus:outline-none"
                placeholder="Your Name"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 w-full border-b border-gray-300 focus:border-indigo-500 focus:ring-0 px-0 py-2 bg-transparent text-lg placeholder-gray-500 focus:outline-none"
                placeholder="you@example.com"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                required
                className="mt-1 w-full border-b border-gray-300 focus:border-indigo-500 focus:ring-0 px-0 py-2 bg-transparent text-lg placeholder-gray-500 focus:outline-none resize-y"
                placeholder="Your message here..."
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, backgroundColor: '#4F46E5' }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
              className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.section>
    </div>
  );
};

export default About;