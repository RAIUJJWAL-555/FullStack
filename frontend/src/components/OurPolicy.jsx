import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion'; // Animation Library

const OurPolicy = () => {
  
  // Policy Data (Array for cleaner code)
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      desc: "We offer hassle-free exchange policy"
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      desc: "We provide 7 days free return policy"
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      desc: "We provide 24/7 customer support"
    }
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // Har item 0.2s ke gap par aayega
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'
    >
      {policies.map((item, index) => (
        <motion.div 
          key={index}
          variants={itemVariants}
          whileHover={{ y: -10 }} // Hover karne par upar uthega
          className="flex-1 flex flex-col items-center p-4 cursor-default"
        >
          {/* Icon with Rotate/Scale Animation on Hover */}
          <motion.img 
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={item.icon} 
            className='w-12 m-auto mb-5' 
            alt="icon" 
          />
          
          <p className='font-bold text-gray-800'>{item.title}</p>
          <p className='text-gray-400 mt-1'>{item.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default OurPolicy;