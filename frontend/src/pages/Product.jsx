import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { motion, AnimatePresence } from 'framer-motion'; // Animation Library

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description'); // Tab State
  const [isShake, setIsShake] = useState(false); // Shake animation state

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // Handle Add to Cart with Validation Animation
  const handleAddToCart = () => {
    if (!size) {
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500); // Reset shake after 500ms
      // Optional: Add Toast here "Please select a size"
    } else {
      addToCart(productData._id, size);
    }
  }

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 min-h-screen'>
      
      {/* --- Product Main Section --- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        
        {/* --- Left Side: Product Images --- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
             
             {/* Thumbnails */}
             <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:w-[18.7%] w-full no-scrollbar">
              {
                productData.image.map((item, index) => (
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setImage(item)} 
                    src={item} 
                    key={index} 
                    className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md border-2 ${item === image ? 'border-orange-500' : 'border-transparent'}`} 
                    alt="" 
                  />
                ))
              }
             </div>
             
             {/* Main Image with Transition */}
             <div className="w-full sm:w-[80%] relative overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
                <AnimatePresence mode='wait'>
                    <motion.img 
                        key={image} // Key change triggers animation
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className='w-full h-auto object-contain mix-blend-multiply' 
                        src={image} 
                        alt="" 
                    />
                </AnimatePresence>
             </div>
        </div>

        {/* --- Right Side: Product Information --- */}
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
        >
          <h1 className="font-bold text-3xl mt-2 text-gray-800">{productData.name}</h1>
          
          <div className="flex items-center gap-1 mt-2">
            <div className="flex text-orange-500 text-sm">
                {[...Array(4)].map((_, i) => <img key={i} className='w-3.5' src={assets.star_icon} alt="" />)}
                <img className='w-3.5' src={assets.star_dull_icon} alt="" />
            </div>
            <p className='pl-2 text-gray-500'>(122 reviews)</p>
          </div>

          <p className='mt-5 text-3xl font-bold text-gray-900'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5 leading-relaxed'>{productData.description}</p>
          
          <div className="flex flex-col gap-4 my-8">
           <p className='font-semibold'>SELECT SIZE</p>
           <div className="flex gap-3">
             {
              productData.sizes.map((item, index) => (
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSize(item)} 
                    className={`border py-2 px-4 rounded-md font-medium transition-all ${item === size ? 'bg-black text-white border-black shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} 
                    key={index}
                >
                    {item}
                </motion.button>
              ))
             }
           </div>
          </div>

          <motion.button 
            onClick={handleAddToCart} 
            // Shake animation if no size selected
            animate={isShake ? { x: [-10, 10, -10, 10, 0] } : {}}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full shadow-xl transition-all ${size ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            {size ? 'Add to Cart' : 'Select Size First'}
          </motion.button>

          <hr className='mt-8 sm:w-4/5 border-gray-200' />
          
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p className='flex items-center gap-2'>✅ 100% Original product.</p>
            <p className='flex items-center gap-2'>🚚 Cash on delivery is available.</p>
            <p className='flex items-center gap-2'>🔄 Easy return and exchange within 7 days.</p>
          </div>
        </motion.div>
      </div>

      {/* --- Description & Reviews Tabs (Magic Motion) --- */}
      <div className="mt-20">
        <div className="flex gap-8 border-b border-gray-300 pb-2 relative w-fit">
            {['description', 'reviews'].map((tab) => (
                <div key={tab} className="relative cursor-pointer">
                    <p 
                        onClick={() => setActiveTab(tab)}
                        className={`font-bold text-sm uppercase pb-2 px-2 transition-colors ${activeTab === tab ? 'text-black' : 'text-gray-400'}`}
                    >
                        {tab === 'description' ? 'Description' : 'Reviews (122)'}
                    </p>
                    {/* The Magic Sliding Line */}
                    {activeTab === tab && (
                        <motion.div 
                            layoutId="underline"
                            className="absolute left-0 bottom-[-9px] w-full h-[3px] bg-black"
                        />
                    )}
                </div>
            ))}
        </div>

        <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 mt-4 rounded-xl bg-gray-50"
        >
            {activeTab === 'description' ? (
                <>
                    <p>An e-commerce website is an online platform that facilitates the buying and selling of services. Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia distinctio neque assumenda, nulla officiis autem.</p>
                    <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and available variants (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
                </>
            ) : (
                <div className="flex flex-col gap-2">
                    <p className="font-bold text-gray-800">John Doe <span className="text-xs font-normal text-gray-500">- 2 days ago</span></p>
                    <p>Amazing product! The quality is top-notch and delivery was super fast.</p>
                </div>
            )}
        </motion.div>
      </div>

      {/* --- Related Products --- */}
      <div className="mt-16">
          <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
      </div>

    </div>
  ) : <div className="opacity-0"></div>
}

export default Product;