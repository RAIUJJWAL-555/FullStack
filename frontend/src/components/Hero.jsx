import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion'; // Animation Library

const Hero = () => {

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.3 } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { width: "2.5rem", transition: { duration: 0.8, ease: "easeOut" } } // 2.5rem approx w-11
  };

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 overflow-hidden'>
      
      {/* --- Hero Left Side (Text) --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 bg-white"
      >
         <div className="text-[#414141]">
            
            {/* Top Subtitle */}
            <div className="flex items-center gap-2">
                 <motion.p variants={lineVariants} className='h-[2px] bg-[#414141]'></motion.p>
                 <motion.p variants={textVariants} className='font-medium text-sm md:text-base uppercase tracking-widest'>
                    Our Bestsellers
                 </motion.p>
            </div>

            {/* Main Title */}
            <motion.h1 
              variants={textVariants} 
              className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-gray-800'
            >
              Latest Arrivals
            </motion.h1>

            {/* CTA Button */}
            <motion.div 
              variants={textVariants}
              className="flex items-center gap-2 group cursor-pointer w-fit"
            >
                 <p className='font-semibold text-sm md:text-base group-hover:text-black transition-colors'>SHOP NOW</p>
                 <motion.p 
                    variants={lineVariants} 
                    className='h-[1px] bg-[#414141] group-hover:w-16 transition-all duration-300' // Line grows on hover
                 ></motion.p>
            </motion.div>
         </div>
      </motion.div>

      {/* --- Hero Right Side (Image) --- */}
      <motion.div 
        initial={{ opacity: 0, x: 100, scale: 1.1 }} // Zoomed in initially
        animate={{ opacity: 1, x: 0, scale: 1 }} // Normal position
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full sm:w-1/2 overflow-hidden"
      >
        <img 
            src={assets.hero_img} 
            className='w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out' 
            alt="Hero" 
        />
      </motion.div>

    </div>
  );
}

export default Hero;