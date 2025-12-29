import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'; // Animation Library

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + '/api/order/verifyStripe',
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate('/orders');
      } else {
        navigate('/cart');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center bg-white'>
      
      {/* --- Animated Loader --- */}
      <div className="relative flex items-center justify-center">
          {/* Outer Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-4 border-gray-100 border-t-black rounded-full shadow-lg"
          ></motion.div>
          
          {/* Inner Pulse Circle */}
          <motion.div 
             animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 1.5, repeat: Infinity }}
             className="absolute w-12 h-12 bg-gray-100 rounded-full"
          ></motion.div>
      </div>

      {/* --- Status Text --- */}
      <motion.h2 
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-8 text-2xl font-semibold text-gray-800 tracking-wide"
      >
        Verifying Payment...
      </motion.h2>

      {/* --- Warning Message (Slide Up) --- */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-gray-400 text-sm"
      >
        Please do not close this window or press back.
      </motion.p>
      
    </div>
  );
};

export default Verify;