import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion'; // Animation Library

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message);
        // Optimistic UI update: Remove from list immediately without refetching
        setList(prev => prev.filter(item => item._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.2 } } // Delete animation
  };

  return (
    <div className='flex flex-col gap-6'>
      
      {/* --- Header Section --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <div>
            <h2 className="text-2xl font-bold text-gray-800">All Products List</h2>
            <p className="text-sm text-gray-500 mt-1">View and manage your store inventory.</p>
         </div>
         <button 
            onClick={fetchList} 
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors"
         >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Refresh List
         </button>
      </div>

      {/* --- Table Header (Desktop) --- */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-4 px-6 bg-gray-100 rounded-xl font-bold text-gray-600 text-sm uppercase tracking-wide border border-gray-200">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className="text-center">Action</p>
      </div>

      {/* --- Product List Content --- */}
      {loading ? (
         // Loading Skeleton
         <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
               <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse"></div>
            ))}
         </div>
      ) : list.length === 0 ? (
         // Empty State
         <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-400 text-lg">No products found.</p>
         </div>
      ) : (
         // List Items
         <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3"
         >
             <AnimatePresence>
                {list.map((item) => (
                  <motion.div
                    layout
                    key={item._id}
                    variants={itemVariants}
                    exit="exit"
                    className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-4 px-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300"
                  >
                    {/* Image */}
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                    />
                    
                    {/* Name */}
                    <div className="flex flex-col gap-1 pr-4">
                        <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                        {/* Mobile Only: Show Price here */}
                        <p className="md:hidden text-indigo-600 font-bold text-sm">{currency}{item.price}</p>
                    </div>
                    
                    {/* Category (Hidden on Mobile) */}
                    <p className="hidden md:inline-block text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-xs font-medium w-fit border border-gray-200">
                        {item.category}
                    </p>
                    
                    {/* Price (Desktop) */}
                    <p className="hidden md:block text-indigo-600 font-bold text-base">
                        {currency}{item.price}
                    </p>
                    
                    {/* Action Button */}
                    <div className="text-right md:text-center">
                        <button 
                          onClick={() => removeProduct(item._id)} 
                          className="group relative inline-flex items-center justify-center p-2 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <svg 
                            className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" 
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                    </div>

                  </motion.div>
                ))}
             </AnimatePresence>
         </motion.div>
      )}
    </div>
  );
}

export default List;