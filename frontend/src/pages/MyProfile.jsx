import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { token, navigate, backendUrl, setCartItems, setToken } = useContext(ShopContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/profile', { headers: { token } });
      if (response.data.success) {
        setUserData(response.data.userData);
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

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    toast.info("Logged out successfully");
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchUserProfile();
    }
  }, [token]);

  if (loading) {
      return (
          <div className='min-h-[50vh] flex items-center justify-center'>
              <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-black animate-spin"></div>
          </div>
      )
  }

  return (userData &&
    <div className='border-t pt-14 min-h-[60vh]'>
        <div className='text-2xl mb-6'>
            <h1 className="font-medium text-gray-800">MY PROFILE</h1>
        </div>
        
        <div className='flex flex-col md:flex-row gap-10 items-start'>
            {/* Left Column: Avatar & Basic Info */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className='w-full md:w-1/3 flex flex-col gap-6'
            >
                <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden self-center md:self-start border border-gray-200 flex items-center justify-center">
                    <img src={assets.profile_icon} className="w-24 opacity-20" alt="" />
                    {/* Placeholder for real avatar if implemented later */}
                </div>
                
                <div className='flex flex-col gap-1 text-center md:text-left'>
                    <h2 className='text-xl font-bold text-gray-800'>{userData.name}</h2>
                    <p className='text-gray-500'>{userData.email}</p>
                </div>

                 <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={logout}
                    className='w-full border border-gray-300 px-8 py-2.5 rounded-full text-gray-600 hover:bg-black hover:text-white transition-all duration-300'
                >
                    Log Out
                </motion.button>
            </motion.div>

            {/* Right Column: Details Card */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.1 }}
               className='w-full md:w-2/3 bg-gray-50 rounded-2xl p-8 border border-gray-100'
            >
                <h3 className='text-lg font-bold text-gray-800 mb-6 underline decoration-2 decoration-gray-200 underline-offset-4'>Account Details</h3>
                
                <div className='grid grid-cols-1 gap-6 text-sm text-gray-600'>
                     <div className='grid grid-cols-[1fr_2fr] gap-4 items-center'>
                        <span className='font-medium text-gray-800'>Full Name:</span>
                        <span className="bg-white px-3 py-2 rounded-lg border border-gray-200">{userData.name}</span>
                     </div>
                     <div className='grid grid-cols-[1fr_2fr] gap-4 items-center'>
                        <span className='font-medium text-gray-800'>Email Address:</span>
                        <span className="bg-white px-3 py-2 rounded-lg border border-gray-200">{userData.email}</span>
                     </div>
                     <div className='grid grid-cols-[1fr_2fr] gap-4 items-center'>
                        <span className='font-medium text-gray-800'>User ID:</span>
                        <span className="font-mono text-xs">{userData._id}</span>
                     </div>
                     <div className='grid grid-cols-[1fr_2fr] gap-4 items-center'>
                        <span className='font-medium text-gray-800'>Cart Items:</span>
                         <span className="">{Object.keys(userData.cartData || {}).length} Unique Products</span>
                     </div>
                </div>

                <div className='mt-10'>
                     <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={()=>navigate('/orders')}
                        className='bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2 group'
                    >
                        View My Orders
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    </div>
  );
};

export default MyProfile;
