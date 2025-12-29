import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Animation Library

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link 
            onClick={() => window.scrollTo(0,0)} // Click karne par page top se start ho
            className='group block cursor-pointer' 
            to={`/product/${id}`}
        >
            <motion.div
                whileHover={{ y: -5 }} // Card lifts up slightly
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg p-2 sm:p-3 hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-gray-100"
            >
                {/* --- Image Section --- */}
                <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/5]">
                    {/* Main Image with Zoom Effect */}
                    <img 
                        className='w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110' 
                        src={image[0]} 
                        alt={name} 
                    />
                    
                    {/* Optional: Add to Cart Overlay Icon (Visual Only) */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-2 rounded-full shadow-md">
                         <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </div>
                </div>

                {/* --- Product Details --- */}
                <div className="mt-3 text-start">
                    <p className='text-xs text-gray-400 font-medium tracking-wide'>FOREVER</p> {/* Brand Name Mockup */}
                    <p className='text-sm text-gray-700 font-medium truncate block'>{name}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <p className='text-sm font-bold text-gray-900'>{currency}{price}</p>
                        {/* Fake Original Price for "Sale" feel (Optional) */}
                        {/* <p className='text-xs text-gray-400 line-through'>{currency}{price + 20}</p> */}
                    </div>
                </div>

            </motion.div>
        </Link>
    );
}

export default ProductItem;