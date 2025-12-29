import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion'; // Animation Library

const Order = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      // Button click par loading feel dene ke liye
      // setLoading(true); // Optional: Agar har baar loader dikhana hai to uncomment karein
      
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Order Loading Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Har card 0.15s ke gap par aayega
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className='border-t pt-16 min-h-[60vh]'>
      
      <div className="text-2xl mb-8">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {loading ? (
        // --- SKELETON LOADER (Optional: Jab tak data load ho raha hai) ---
        <div className="flex flex-col gap-4 animate-pulse">
           {[1,2,3].map((i)=>( <div key={i} className="h-32 bg-gray-100 rounded-lg"></div> ))}
        </div>
      ) : orderData.length === 0 ? (
        // --- EMPTY STATE ---
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center text-gray-500 py-20"
        >
          <p className="text-lg">You haven't placed any orders yet.</p>
        </motion.div>
      ) : (
        // --- ORDERS LIST ---
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='flex flex-col gap-6'
        >
          {orderData.map((item, index) => (
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.01, boxShadow: "0px 10px 20px rgba(0,0,0,0.05)" }} // 3D Lift Effect
              key={index}
              className="py-6 px-4 sm:px-6 bg-white border border-gray-100 rounded-xl shadow-sm transition-all duration-300 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div className="flex items-start gap-6 text-sm">
                
                {/* Product Image */}
                <div className='w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-200'>
                   <img className='w-full h-full object-contain mix-blend-multiply' src={item.image[0]} alt="" />
                </div>
                
                {/* Order Details */}
                <div className='flex flex-col gap-1'>
                  <p className='sm:text-lg font-bold text-gray-800'>{item.name}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <p className='font-semibold text-black'>{currency}{item.price}</p>
                    <span className='w-px h-4 bg-gray-300'></span>
                    <p>Qty: {item.quantity}</p>
                    <span className='w-px h-4 bg-gray-300'></span>
                    <p>Size: {item.size}</p>
                  </div>
                  <div className='mt-2 text-xs text-gray-500'>
                    <p>Date: <span className='font-medium text-gray-700'>{new Date(item.date).toDateString()}</span></p>
                    <p>Method: <span className='font-medium text-gray-700 uppercase'>{item.paymentMethod}</span></p>
                  </div>
                </div>
              </div>

              {/* Status & Action */}
              <div className="md:w-1/2 flex justify-between items-center md:justify-end md:gap-10">
                
                {/* Status Indicator with Pulse Animation */}
                <div className="flex items-center gap-2">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`min-w-3 h-3 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-500'}`} // Color change based on logic if needed
                  ></motion.div>
                  <p className='text-sm md:text-base font-medium text-gray-700'>{item.status}</p>
                </div>

                {/* Track Button */}
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={loadOrderData}
                  className='border border-gray-300 px-6 py-2.5 text-sm font-medium rounded-full hover:shadow-md transition-all'
                >
                  Track Order
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default Order;