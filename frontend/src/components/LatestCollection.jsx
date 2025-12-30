import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion'; // Animation Library

const LatestCollection = () => {
    const { products, loading } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products]);

    // --- Animation Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Har item 0.1s ke baad aayega
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { duration: 0.6, ease: "easeOut" } 
        }
    };

    if (loading) {
        return (
            <div className='my-10'>
                <div className="text-center py-8 text-3xl">
                    <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
                    <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2'>
                        Loading our newest arrivals...
                    </p>
                </div>
                {/* Skeleton Loader */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {[1,2,3,4,5,6,7,8,9,10].map((item) => (
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
                className="text-center py-8 text-3xl"
            >
                <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2'>
                    Explore our newest arrivals featuring the season's most wanted styles. Fresh looks, premium quality, and timeless designs just for you.
                </p>
            </motion.div>

            {/* Rendering products with Animation */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }} // 10% dikhne par animation start
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
            >
                {
                    latestProducts.map((item, index) => (
                        <motion.div 
                            key={item._id} // Use unique ID for better React performance
                            variants={itemVariants}
                        >
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
    )
}

export default LatestCollection;