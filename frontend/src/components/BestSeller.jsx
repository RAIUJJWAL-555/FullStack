import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion'; // Animation Library

const BestSeller = () => {
    const {products, loading} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller || item.bestSeller)); // Check both camelCase and lowercase for safety
        setBestSeller(bestProduct.slice(0,5))
    },[products])

    // --- Animation Variants ---
    
    // Parent Container (Grid)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2 // Har product 0.2 second ke gap par aayega
            }
        }
    };

    // Child Item (Single Product)
    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 }, // Niche se aur thoda chhota hokar aayega
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { duration: 0.5, ease: "easeOut" } 
        }
    };

    if (loading) {
        return (
            <div className='my-10'>
                 <div className="text-center text-3xl py-8">
                    <Title text1={'BEST'} text2={'SELLER'}/>
                    <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2'>
                        Loading our best sellers...
                    </p>
                 </div>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {[1,2,3,4,5].map((item) => (
                        <div key={item} className="animate-pulse">
                            <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    ))}
                 </div>
            </div>
        )
    }

    return (
        <div className='my-10'>
            
            {/* Title Section with Fade In */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center text-3xl py-8"
            >
                <Title text1={'BEST'} text2={'SELLER'}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2'>
                    Discover our most loved styles. These top-rated pieces are flying off the shelves—grab yours before they're gone!
                </p>
            </motion.div>

            {/* Rendering products with Waterfall Animation */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Jab 20% section dikhe tab animation shuru ho
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
            >
                {
                    bestSeller.map((item, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <ProductItem 
                                id={item._id} 
                                image={item.image} 
                                name={item.name} 
                                price={item.price}
                            />
                        </motion.div>
                    ))
                }
            </motion.div>
        </div>
    );
}

export default BestSeller;