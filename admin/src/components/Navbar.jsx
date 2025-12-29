import React from 'react';
import { assets } from '../assets/assets.js';
import { motion } from 'framer-motion'; // Animation Library

const Navbar = ({ setToken }) => {
  return (
    <div className='sticky top-0 z-50 flex items-center py-4 px-[4%] justify-between bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all'>
      
      {/* --- Left Side: Logo & Badge --- */}
      <div className="flex items-center gap-3">
         <motion.img 
            whileHover={{ scale: 1.05 }}
            className='w-32 sm:w-36 cursor-pointer' 
            src={assets.logo} 
            alt="Forever Logo" 
         />
         <span className='hidden sm:block text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200 tracking-wide uppercase'>
            Admin Panel
         </span>
      </div>
      
      {/* --- Right Side: Actions --- */}
      <div className="flex items-center gap-4">
        
        {/* Logout Button */}
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: "#ef4444", color: "#fff", borderColor: "#ef4444" }} // Hover -> Red
          whileTap={{ scale: 0.95 }}
          onClick={() => setToken('')} 
          className='bg-gray-800 text-white border border-gray-800 px-6 py-2 rounded-full font-medium text-sm transition-all shadow-md'
        >
          Logout
        </motion.button>
        
        {/* Profile Avatar (With Pulse Effect) */}
        <div className="relative cursor-pointer group">
            <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shadow-md border-2 border-gray-100"
            >
              AD
            </motion.div>
            {/* Status Dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

      </div>
    </div>
  );
}

export default Navbar;