import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { motion, AnimatePresence } from "framer-motion";

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

  // Empty State
  if (cartData.length === 0) {
     return (
        <div className="border-t pt-14 flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6"
           >
              <img src={assets.cart_icon} className="w-10 opacity-40" alt="" />
           </motion.div>
           <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
           <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet.</p>
           <button 
             onClick={() => navigate('/collection')}
             className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 duration-200"
           >
             Continue Shopping
           </button>
        </div>
     )
  }

  return (
    <div className="border-t pt-10 pb-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
      
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        {/* Left Side: Cart Items */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="text-3xl">
               <Title text1={"YOUR"} text2={"CART"} />
            </div>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border">
                {cartData.length} Items in Cart
            </span>
          </div>
          
          <div className="flex flex-col gap-4">
             <AnimatePresence>
                {cartData.map((item, index) => {
                  const productData = products.find((product) => product._id === item._id);
                  if(!productData) return null;

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      key={`${item._id}-${item.size}`}
                      className="group relative bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 grid grid-cols-[1fr_2fr] sm:grid-cols-[120px_1fr_auto] gap-6 items-center"
                    >
                      {/* Product Image */}
                      <div className="w-full h-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-2 relative">
                           <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors z-10"></div>
                          <img src={productData.image[0]} className="h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" alt="" />
                      </div>

                      {/* Product INFO */}
                      <div className="flex flex-col justify-center gap-2">
                          <h3 className="font-bold text-gray-800 text-lg sm:text-xl leading-snug tracking-tight hover:text-primary transition-colors cursor-pointer">{productData.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                             <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-md border border-gray-200">
                                <span className="text-xs text-gray-500">Size:</span>
                                <span className="text-sm font-semibold text-gray-800">{item.size}</span>
                             </div>
                             <p className="font-bold text-lg text-primary">{currency}{productData.price}</p>
                          </div>
                      </div>

                      {/* Quantity & Remove Control */}
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 sm:gap-6 justify-self-end w-full sm:w-auto mt-2 sm:mt-0">
                         {/* Custom Quantity Selector */}
                         <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full h-11 w-fit shadow-sm">
                            <button 
                               onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                               className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary hover:bg-white rounded-l-full transition-all disabled:opacity-30 active:scale-95"
                               disabled={item.quantity <= 1}
                            >
                               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" /></svg>
                            </button>
                            <span className="w-8 text-center font-bold text-gray-800 text-sm">{item.quantity}</span>
                            <button 
                               onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                               className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary hover:bg-white rounded-r-full transition-all active:scale-95"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                            </button>
                         </div>
                         
                         {/* Trash Icon */}
                         <button 
                           onClick={() => updateQuantity(item._id, item.size, 0)}
                           className="text-gray-400 hover:text-rose-500 hover:bg-rose-50 p-2.5 rounded-full transition-all duration-200 group-hover:block"
                           title="Remove item"
                         >
                           <img src={assets.bin_icon} className="w-5 h-5 opacity-60 group-hover:opacity-100" alt="Remove" />
                         </button>
                      </div>

                    </motion.div>
                  );
                })}
             </AnimatePresence>
          </div>
          {/* Trust Badges - To fill space */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 opacity-70">
              <div className="flex flex-col items-center text-center p-4">
                  <svg className="w-8 h-8 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  <p className="font-semibold text-gray-800 text-sm">Secure Payment</p>
                  <p className="text-xs text-gray-500 mt-1">100% secure payment gateway</p>
              </div>
               <div className="flex flex-col items-center text-center p-4">
                  <svg className="w-8 h-8 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                  <p className="font-semibold text-gray-800 text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-500 mt-1">On orders over $100</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                  <svg className="w-8 h-8 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  <p className="font-semibold text-gray-800 text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-500 mt-1">7 Days return policy</p>
              </div>
          </div>

        </div>

        {/* Right Side: Summary - Sticky */}
        <div className="lg:sticky lg:top-24 h-fit">
           <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 sm:p-8 relative overflow-hidden">
             
             {/* Decorative Top Line */}
             <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary"></div>

             <CartTotal />
             <div className="mt-8 w-full">
               <button
                 onClick={() => navigate("/PlaceOrder")}
                 className="w-full bg-black hover:bg-gray-800 text-white font-bold text-sm py-4 rounded-xl shadow-xl hover:shadow-2xl transform transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group relative overflow-hidden"
               >
                 <span className="relative z-10 flex items-center gap-2">
                   PROCEED TO CHECKOUT
                   <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </span>
                 <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </button>
               
               <button 
                   onClick={() => navigate('/collection')}
                   className="w-full text-center text-gray-500 text-xs mt-6 hover:text-primary transition-colors flex items-center justify-center gap-1 group"
               >
                   <svg className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                   Continue Shopping
               </button>
             </div>
           </div>
        </div>

      </div>
      </div>
    </div>
  );
};

export default Cart;
