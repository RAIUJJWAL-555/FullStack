import React from 'react';
import { motion } from 'framer-motion'; // Animation Library

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      
      {/* Text Animation: Slide in from left */}
      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} // Animation happens only once per scroll
        transition={{ duration: 0.5, delay: 0.2 }}
        className='text-gray-500 font-normal uppercase'
      >
        {text1}
        <span className='text-gray-700 font-medium pl-2 sm:pl-3'>
            {text2}
        </span>
      </motion.p>

      {/* Line Animation: Grow from 0 width */}
      <motion.span 
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "3rem", opacity: 1 }} // 3rem is approx w-12
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }} // Text ke baad line aayegi
        className='h-[1px] sm:h-[2px] bg-gray-700 block'
      ></motion.span>

    </div>
  );
}

export default Title;