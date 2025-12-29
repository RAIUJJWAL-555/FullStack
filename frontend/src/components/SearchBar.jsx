import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Animation Library

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    return (
        <AnimatePresence>
            {showSearch && visible ? (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className='border-t border-b bg-gray-50 text-center overflow-hidden' // Overflow hidden zaroori hai height animation ke liye
                >
                    <div className="inline-flex items-center justify-center border border-gray-300 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white focus-within:ring-1 focus-within:ring-black focus-within:border-black transition-all shadow-sm">
                        
                        <input 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            className='flex-1 outline-none text-gray-700 bg-transparent placeholder-gray-400 text-sm' 
                            type="text" 
                            placeholder='Search for products...' 
                        />
                        
                        <img className='w-4 opacity-50' src={assets.search_icon} alt="Search" />
                    </div>
                    
                    {/* Close Icon with Hover Effect */}
                    <motion.img 
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowSearch(false)} 
                        className='inline w-3 cursor-pointer text-gray-500 hover:opacity-100 transition-opacity ml-2' 
                        src={assets.cross_icon} 
                        alt="Close" 
                    />
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

export default SearchBar;