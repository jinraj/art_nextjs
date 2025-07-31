'use client';

import { motion } from 'framer-motion';

const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.2, duration: 0.5 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function MaterialsSection() {
    return (
        <>
            <motion.h2
                variants={itemVariants}
                className="text-2xl px-5 text-center mt-10 mb-20 font-light"
            >
                From concept to execution, we exceeded expectations - innovative, professional, and truly brand-defining work!
            </motion.h2>
            <motion.section
                className="mx-auto my-12 px-5 sm:px-6 lg:px-10 max-w-7xl flex flex-col md:flex-row items-center gap-8"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <motion.div
                    variants={itemVariants}
                    className="w-full md:w-1/2 h-90 md:h-120 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/resources/application/pexels2.jpg')`,
                    }}
                >
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-start items-start text-left"
                >
                    <h3 className="text-4xl md:text-4xl font-bold mb-4">Crafting Stories with Light and Texture</h3>
                    <p className="text-md md:text-md text-gray-700 leading-relaxed">
                        Every photograph is a curated moment, a play of light and shadow designed to evoke emotion.
                        We meticulously select high-quality materials, from rich fabrics that provide depth and softness
                        to unique wooden elements that add character and warmth. Our dedication to detail extends to the final presentation,
                        where bespoke frames are chosen to complement each piece, transforming a simple image into a captivating visual experience.
                        It's about bringing together the art of photography with the tactile beauty of decor to create truly immersive visual narratives for your space.
                    </p>
                </motion.div>
            </motion.section>
        </>
    );
}
