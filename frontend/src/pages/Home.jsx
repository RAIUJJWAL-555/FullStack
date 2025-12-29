import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsLetterBox from '../components/NewsLetterBox';
import { motion, AnimatePresence } from 'framer-motion'; // Animation Library

const Home = () => {
  const [showButton, setShowButton] = useState(false);

  // Scroll detect karne ke liye effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Top par scroll karne ka function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='relative'>
      
      {/* --- Main Sections --- */}
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>

      {/* --- Floating "Back to Top" Button --- */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1, backgroundColor: "#000" }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 z-50 bg-gray-800 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center border border-gray-700 hover:shadow-xl transition-all"
            title="Back to Top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Home;