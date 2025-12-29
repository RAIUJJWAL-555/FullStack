import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { motion, AnimatePresence } from 'framer-motion';

const Collection = () => {
  const { products, search, showSearch, loading } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [shortType, setShortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy)
  }

  const shortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (shortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    shortProduct();
  }, [shortType]);

  // Framer Motion Variants for Staggered Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Har product 0.1s ke gap par aayega
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t min-h-screen'>
      
      {/* --- Filter Options (Left Side) --- */}
      <div className="min-w-60">
        
        {/* Filter Toggle Button (Mobile) */}
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 font-medium text-gray-700 hover:text-black transition-colors'>
          FILTERS
          <motion.img 
            animate={{ rotate: showFilter ? 90 : 0 }}
            className='h-3 block sm:hidden' 
            src={assets.dropdown_icon} 
            alt="" 
          />
        </p>

        {/* Filter Content Wrapper (Sticky on Desktop) */}
        <div className={`sm:sticky sm:top-24 transition-all duration-300 ease-in-out`}>
            
            {/* Category Filter */}
            <div className={`border border-gray-300 pl-5 py-3 mt-6 rounded-lg shadow-sm bg-white ${showFilter ? '' : 'hidden'} sm:block`}>
              <p className='mb-3 text-sm font-bold tracking-wide'>CATEGORIES</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                {['Men', 'Women', 'Kids'].map((cat) => (
                  <label key={cat} className='flex gap-2 cursor-pointer hover:text-primary transition-colors'>
                    <input type="checkbox" className='w-3 accent-black' value={cat} onChange={toggleCategory} /> 
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* SubCategory Filter */}
            <div className={`border border-gray-300 pl-5 py-3 my-5 mt-6 rounded-lg shadow-sm bg-white ${showFilter ? '' : 'hidden'} sm:block`}>
              <p className='mb-3 text-sm font-bold tracking-wide'>TYPE</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                 {['Topwear', 'Bottomwear', 'Winterwear'].map((sub) => (
                    <label key={sub} className='flex gap-2 cursor-pointer hover:text-primary transition-colors'>
                      <input type="checkbox" className='w-3 accent-black' value={sub} onChange={toggleSubCategory} /> 
                      {sub}
                    </label>
                  ))}
              </div>
            </div>
        </div>
      </div>

      {/* --- Right Side (Products) --- */}
      <div className="flex-1">
        
        <div className="flex justify-between text-base sm:text-2xl mb-4 items-center">
           <Title text1={'ALL'} text2={'COLLECTIONS'}/>
           {/* Modern Select Dropdown */}
           <select 
             onChange={(e) => setShortType(e.target.value)} 
             className="border-2 border-gray-300 text-sm px-4 py-2 rounded-full outline-none hover:border-black transition-colors cursor-pointer bg-white"
           >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
           </select>
        </div>

        {/* --- Product Grid (Simplified for Debugging) --- */}
        {loading ? (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                 {[1,2,3,4,5,6,7,8].map((item) => (
                     <div key={item} className="animate-pulse">
                         <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-4"></div>
                         <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                         <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                     </div>
                 ))}
             </div>
        ) : filterProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {filterProducts.map((item, index) => (
                <ProductItem key={item._id} name={item.name} id={item._id} price={item.price} image={item.image} />
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <p className="text-xl">No products found matching your filters.</p>
            <button onClick={()=>{setCategory([]); setSubCategory([])}} className="mt-4 text-primary underline">Clear Filters</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Collection;