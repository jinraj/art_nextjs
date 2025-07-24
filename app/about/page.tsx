'use client';
import { motion } from 'framer-motion';
import { FaPaintBrush, FaCamera, FaGlobeAsia } from 'react-icons/fa';
import { FaEnvelope, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';
import TitleLayout from '../components/TitleLayout';

const About = () => {
  return (
    <div className="min-h-screen px-6 py-12">
      <TitleLayout
        prefix="Hi, I'm "
        title="Jinraj Jain"
        quote="A passionate artist, tech-savvy creator, and wanderer—crafting meaningful visuals and stories through paintings, pixels, and moments."
      />

      {/* Timeline / Journey */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold text-center mb-10">My Journey</h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          {[
            { year: '2010', text: 'Discovered my love for art and painting at a small local gallery.' },
            { year: '2015', text: 'Graduated in Computer Science. Began blending art with tech.' },
            { year: '2020', text: 'Started exhibiting my artworks and building an online presence.' },
            { year: '2024', text: 'Launched my own brand and took my art global.' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-white border-l-4 border-blue-400 pl-4 py-4 shadow-sm rounded"
            >
              <h3 className="text-blue-600 font-semibold">{item.year}</h3>
              <p className="text-gray-700">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills / Mediums */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold text-center mb-10">What I Love</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: <FaPaintBrush size={32} />,
              title: 'Acrylic Portraits',
              desc: 'Capturing emotion and soul on canvas with vibrant colors.',
            },
            {
              icon: <FaCamera size={32} />,
              title: 'Videography & Editing',
              desc: 'Telling stories with motion and rhythm.',
            },
            {
              icon: <FaGlobeAsia size={32} />,
              title: 'Travel & Culture',
              desc: 'Inspiration from people, places, and traditions.',
            },
          ].map((skill, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="bg-gradient-to-br from-slate-100 via-slate-50 to-white rounded-2xl shadow-lg p-6 text-center"
            >
              <div className="text-rose-300 mb-4">{skill.icon}</div>
              <h4 className="font-semibold text-lg">{skill.title}</h4>
              <p className="text-gray-600 mt-2">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>


      {/* Contact */}
      <div className="min-h-screen px-6 py-12 rounded-4xl  bg-slate-200">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-800"
          >
            Let’s Talk
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 text-gray-600 text-lg max-w-xl mx-auto"
          >
            Have a question, collaboration idea, or just want to say hi? I'm always open to meaningful conversations.
          </motion.p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {[
            {
              icon: <FaEnvelope size={24} />,
              title: 'Email',
              value: 'jinrajjain@example.com',
              href: 'mailto:jinrajjain@example.com',
            },
            {
              icon: <FaMapMarkerAlt size={24} />,
              title: 'Location',
              value: 'Bangalore, India',
              href: '',
            },
            {
              icon: <FaInstagram size={24} />,
              title: 'Instagram',
              value: '@art.by.jinraj',
              href: 'https://instagram.com/art.by.jinraj',
            },
          ].map((card, idx) => (
            <motion.a
              key={idx}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-slate-100 via-slate-50 to-white

 p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <div className="text-green-700 mb-3">{card.icon}</div>
              <h4 className="font-semibold text-lg mb-1">{card.title}</h4>
              <p className="text-gray-600">{card.value}</p>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent! (Hook to backend here)");
            }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows={4}
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;
