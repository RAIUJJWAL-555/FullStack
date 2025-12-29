import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { motion, AnimatePresence } from "framer-motion"; // Animation Library

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // --- EMPTY CART UI ---
  if (cartData.length === 0) {
     return (
        <div className="border-t pt-14 flex flex-col items-center justify-center min-h-[50vh] text-center px-4 bg-gray-50">
           <motion.div 
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg"
           >
              <img src={assets.cart_icon || "https://cdn-icons-png.flaticon.com/512/2038/2038854.png"} className="w-10 opacity-40" alt="" />
           </motion.div>
           <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
           <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet.</p>
           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => navigate('/collection')}
             className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors shadow-xl"
           >
             Continue Shopping
           </motion.button>
        </div>
     )
  }

  return (
    <div className="border-t pt-10 pb-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
      
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        
        {/* --- LEFT SIDE: CART ITEMS --- */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="text-3xl">
               <Title text1={"YOUR"} text2={"CART"} />
            </div>
            <span className="text-xs font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border shadow-sm">
                {cartData.length} Items
            </span>
          </div>
          
          <div className="flex flex-col gap-4">
             {/* AnimatePresence allows components to animate out when removed */}
             <AnimatePresence mode="popLayout">
                {cartData.map((item) => {
                  const productData = products.find((product) => product._id === item._id);
                  if(!productData) return null;

                  return (
                    <motion.div
                      layout // This prop makes the list reorganize smoothly when an item is deleted
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100, scale: 0.9 }} // Exit animation (Slide left)
                      transition={{ duration: 0.4, type: "spring" }}
                      key={`${item._id}-${item.size}`}
                      className="group relative bg-white border border-gray-100 p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-[1fr_2fr] sm:grid-cols-[120px_1fr_auto] gap-6 items-center"
                    >
                      {/* Product Image */}
                      <div className="w-full h-28 sm:h-32 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-2 relative">
                          <motion.img 
                            whileHover={{ scale: 1.1 }}
                            src={productData.image[0]} 
                            className="h-full object-contain mix-blend-multiply" 
                            alt="" 
                          />
                      </div>

                      {/* Product INFO */}
                      <div className="flex flex-col justify-center gap-2">
                          <h3 className="font-bold text-gray-800 text-lg sm:text-xl leading-snug cursor-pointer hover:text-orange-500 transition-colors" onClick={()=>navigate(`/product/${item._id}`)}>
                            {productData.name}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                             <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-md border border-gray-200">
                                <span className="text-xs text-gray-500">Size:</span>
                                <span className="text-sm font-semibold text-gray-800">{item.size}</span>
                             </div>
                             <p className="font-bold text-lg text-gray-700">{currency}{productData.price}</p>
                          </div>
                      </div>

                      {/* Quantity & Remove Control */}
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 sm:gap-6 justify-self-end w-full sm:w-auto mt-2 sm:mt-0">
                         
                         {/* Modern Quantity Selector */}
                         <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full h-10 shadow-inner">
                            <button 
                               onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                               className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors rounded-l-full disabled:opacity-30"
                               disabled={item.quantity <= 1}
                            >
                               -
                            </button>
                            <span className="w-8 text-center font-bold text-gray-800 text-sm">{item.quantity}</span>
                            <button 
                               onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                               className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors rounded-r-full"
                            >
                                +
                            </button>
                         </div>
                         
                         {/* Trash Icon with Hover Shake */}
                         <motion.button 
                           whileHover={{ scale: 1.2, rotate: 10, color: "#ef4444" }}
                           whileTap={{ scale: 0.9 }}
                           onClick={() => updateQuantity(item._id, item.size, 0)}
                           className="text-gray-400 p-2 transition-colors"
                           title="Remove item"
                         >
                           <img src={assets.bin_icon} className="w-5 h-5 opacity-70" alt="Remove" />
                         </motion.button>
                      </div>

                    </motion.div>
                  );
                })}
             </AnimatePresence>
          </div>

          {/* Trust Badges (Added for UX) */}
          <div className="mt-12 grid grid-cols-3 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-center">
                  <p className="font-bold text-xs text-gray-800">🔒 Secure Pay</p>
              </div>
               <div className="text-center">
                  <p className="font-bold text-xs text-gray-800">🚚 Free Ship</p>
              </div>
              <div className="text-center">
                  <p className="font-bold text-xs text-gray-800">↩️ Easy Return</p>
              </div>
          </div>

        </div>

        {/* --- RIGHT SIDE: SUMMARY (Sticky) --- */}
        <div className="lg:sticky lg:top-24 h-fit">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 relative overflow-hidden"
           >
             <CartTotal />
             
             <div className="mt-8 w-full">
               <motion.button
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => navigate("/place-order")}
                 className="w-full bg-black hover:bg-gray-800 text-white font-bold text-sm py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 group"
               >
                 PROCEED TO CHECKOUT
                 <span className="group-hover:translate-x-1 transition-transform">→</span>
               </motion.button>
               
               <button 
                   onClick={() => navigate('/collection')}
                   className="w-full text-center text-gray-500 text-xs mt-6 hover:text-black transition-colors underline decoration-dotted"
               >
                   Continue Shopping
               </button>
             </div>
           </motion.div>
        </div>

      </div>
      </div>
    </div>
  );
};

export default Cart;