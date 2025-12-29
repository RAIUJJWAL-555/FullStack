import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion'; // Animation Library

const RelatedProducts = ({ category, subCategory }) => {
    
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            // Filter logic
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

            setRelated(productsCopy.slice(0, 5));
        }
    }, [products, category, subCategory]); // Added dependencies to auto-update on product change

    // --- Animation Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15 // 0.15s delay between each item
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { duration: 0.5, ease: "easeOut" } 
        }
    };

    return related.length > 0 ? (
        <div className='my-24'>
            
            {/* Title Animation */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center text-3xl py-2 mb-8"
            >
               <Title text1={"RELATED"} text2={"PRODUCTS"}/>
            </motion.div>

            {/* Product Grid Animation */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Animation starts when 20% visible
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
            >
                {
                    related.map((item, index) => (
                        <motion.div key={item._id} variants={itemVariants}>
                            <ProductItem 
                                id={item._id} 
                                name={item.name} 
                                price={item.price} 
                                image={item.image}
                            />
                        </motion.div>
                    ))
                }
            </motion.div>
          
        </div>
    ) : null; // Agar koi related product nahi hai to kuch mat dikhao (Clean UI)
}

export default RelatedProducts;