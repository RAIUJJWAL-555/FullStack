import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';
import { motion } from 'framer-motion'; // Animation library

const Contact = () => {
  
  // Animation Variants
  const textVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className='overflow-hidden'> {/* Prevents scrollbar flickering */}
      
      {/* --- Page Title --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-2xl pt-10 border-t"
      >
        <Title text1={'CONTACT'} text2={'US'}/>
      </motion.div>

      {/* --- Main Content Section --- */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 max-w-7xl mx-auto px-4">
        
        {/* --- Left Side: Floating Image --- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:max-w-[480px]"
        >
           <motion.img 
             // Continuous Floating Animation
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className='w-full h-auto object-cover rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300' 
             src={assets.contact_img} 
             alt="Contact Us" 
           />
        </motion.div>

        {/* --- Right Side: Contact Details --- */}
        <div className="flex flex-col justify-center items-start gap-8 md:w-1/2">
          
          {/* Store Info Block */}
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={textVariant}
             className="flex flex-col gap-4"
          >
            <h3 className='font-bold text-2xl text-gray-800 flex items-center gap-2'>
              Our Store 
              <span className='w-12 h-[2px] bg-gray-800 inline-block'></span>
            </h3>
            
            <motion.div 
              whileHover={{ scale: 1.02, x: 5 }}
              className="text-gray-500 hover:text-gray-700 transition-colors cursor-default bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm"
            >
                <p className='font-medium'>Address:</p>
                <p>54709 Willms Station <br /> Suite 350, Washington, USA</p>
            </motion.div>

            <motion.div 
               whileHover={{ scale: 1.02, x: 5 }}
               className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm"
            >
                <p className='font-medium'>Contact Info:</p>
                <p>Tel: (415) 555-0132</p>
                <p>Email: admin@forever.com</p>
            </motion.div>
          </motion.div>

          {/* Careers Block */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3, duration: 0.6 }}
             className="flex flex-col gap-4 mt-4"
          >
             <h3 className='font-bold text-2xl text-gray-800'>Careers at Forever</h3>
             <p className='text-gray-500'>Learn more about our teams and job openings.</p>
             
             {/* Animated Button */}
             <motion.button 
               whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }}
               whileTap={{ scale: 0.95 }}
               className='border border-black px-8 py-4 text-sm font-semibold hover:bg-black hover:text-white transition-all duration-300 w-fit rounded-full shadow-md hover:shadow-xl'
             >
                Explore Jobs
             </motion.button>
          </motion.div>

        </div>
      </div>
      
      {/* Newsletter with Fade Up */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <NewsLetterBox/>
      </motion.div>

    </div>
  );
}

export default Contact;