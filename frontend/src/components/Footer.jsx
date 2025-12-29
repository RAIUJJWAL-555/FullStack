import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion'; // Animation Library

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className='mt-20'
    >
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
        
        {/* --- Brand Section --- */}
        <div className='flex flex-col gap-4'>
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={assets.logo} 
              className='mb-2 w-32 cursor-pointer' 
              alt="Logo" 
            />
            <p className='w-full md:w-2/3 text-gray-600 leading-relaxed'>
              Forever is an e-commerce platform that facilitates the buying and selling of services. We are dedicated to providing the best quality products with a seamless shopping experience.
            </p>
        </div>

        {/* --- Company Links (Interactive) --- */}
        <div>
            <p className='text-xl font-bold mb-5 text-gray-800'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                {['Home', 'About Us', 'Delivery', 'Privacy Policy'].map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5, color: '#000' }} // Slide Right on Hover
                    className='cursor-pointer transition-colors duration-200'
                  >
                    {item}
                  </motion.li>
                ))}
            </ul>
        </div>

        {/* --- Contact Info --- */}
        <div>
            <p className='text-xl font-bold mb-5 text-gray-800'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <motion.li 
                   whileHover={{ x: 5, color: '#000' }}
                   className='cursor-pointer flex items-center gap-2'
                >
                   📞 +1-222-456-7890
                </motion.li>
                <motion.li 
                   whileHover={{ x: 5, color: '#000' }}
                   className='cursor-pointer flex items-center gap-2'
                >
                   📧 contact@foreveryou.com
                </motion.li>
                <motion.li 
                   whileHover={{ x: 5, color: '#000' }}
                   className='cursor-pointer flex items-center gap-2'
                >
                   📸 <a href="#" className='hover:underline'>Instagram</a>
                </motion.li>
            </ul>
        </div>
      </div>

      {/* --- Copyright Section --- */}
      <div>
            <hr className='border-gray-200' />
            <p className='py-5 text-sm text-center text-gray-500'>
              Copyright {currentYear} @ forever.com - All rights reserved.
            </p>
      </div>
    </motion.div>
  );
}

export default Footer;