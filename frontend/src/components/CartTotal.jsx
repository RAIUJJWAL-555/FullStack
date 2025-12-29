import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';
import { motion, AnimatePresence } from 'framer-motion'; // Animation Library

const CartTotal = () => {
    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);
    const subtotal = getCartAmount();
    const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className='w-full'>
        
        {/* Title Section */}
        <div className="text-2xl mb-4">
         <Title text1={'ORDER'} text2={'SUMMARY'}/> 
        </div>

        {/* Receipt Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 text-sm bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden"
        >
            {/* Decorative Top Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200"></div>

            {/* Subtotal Row */}
            <div className="flex justify-between items-center text-gray-600">
              <p>Subtotal</p>
              <p className="font-medium text-gray-900 tracking-wide">{currency} {subtotal}.00</p>
            </div>

            {/* Shipping Row */}
            <div className="flex justify-between items-center text-gray-600">
              <p>Shipping Fee</p>
              <p className="font-medium text-gray-900 tracking-wide">{currency} {delivery_fee}.00</p>
            </div>

            {/* Dashed Divider (Receipt Look) */}
            <hr className="border-dashed border-gray-300 my-1" />

            {/* Total Row with Number Animation */}
            <div className="flex justify-between items-center">
              <b className="text-lg text-gray-800">Total</b>
              
              {/* AnimatePresence for Number Pop Effect */}
              <div className="flex items-center overflow-hidden">
                  <b className="text-lg text-gray-800 mr-1">{currency}</b>
                  <AnimatePresence mode='popLayout'>
                    <motion.b 
                        key={total} // Key change triggers animation
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="text-xl text-black"
                    >
                        {total}.00
                    </motion.b>
                  </AnimatePresence>
              </div>
            </div>
            
            {/* Bottom Note */}
            <div className="mt-2 text-xs text-gray-400 text-center bg-gray-50 py-2 rounded">
               <span className='text-green-600 font-medium'>Free Shipping</span> on orders over $200
            </div>
        </motion.div>
    </div>
  );
}

export default CartTotal;