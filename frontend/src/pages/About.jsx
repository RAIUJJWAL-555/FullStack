import React from 'react';
import { motion } from 'framer-motion'; // Animation library
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  // Animation Variants for reusability
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className='overflow-hidden'> {/* Overflow hidden to prevent scrollbars during animation */}
      
      {/* Page Title with Fade In */}
      <motion.div 
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-2xl text-center pt-8 border-t"
      >
        <Title text1={'ABOUT'} text2={'US'}/>
      </motion.div>

      {/* About Content Section */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        
        {/* Left Side: Image with Floating Animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInLeft}
          className="w-full md:max-w-[450px]"
        >
            <motion.img 
                className='w-full h-auto object-cover rounded-lg shadow-lg' 
                src={assets.about_img} 
                alt="About Us"
                // Continuous Floating Animation
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.div>

        {/* Right Side: Text Content with Staggered Slide */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRight}
          className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600"
        >
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          
          <b className='text-gray-800 text-lg'>Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </motion.div>
      </div>

      {/* Why Choose Us Title */}
      <motion.div 
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-xl py-4"
      >
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </motion.div>

      {/* Features Grid with 3D Hover Effect */}
      <div className="flex flex-col md:flex-row text-sm mb-20 gap-5">
         
         {/* Feature Box 1 */}
         <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05, backgroundColor: "#f9fafb", zIndex: 10 }} // 3D Scale Effect
            className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-300 cursor-pointer bg-white"
         >
           <b>Quality Assurance:</b>
           <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
         </motion.div>

         {/* Feature Box 2 */}
         <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.05, backgroundColor: "#f9fafb", zIndex: 10 }} // 3D Scale Effect
            className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-300 cursor-pointer bg-white"
         >
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
         </motion.div>

         {/* Feature Box 3 */}
         <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.05, backgroundColor: "#f9fafb", zIndex: 10 }} // 3D Scale Effect
            className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-300 cursor-pointer bg-white"
         >
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you all the way, ensuring your satisfaction is our top priority.</p>
         </motion.div>

      </div>

      <NewsLetterBox/>
    </div>
  );
}

export default About;