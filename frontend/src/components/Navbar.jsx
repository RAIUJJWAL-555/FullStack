import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion'; // Animation Library

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  // NavLink Hover Animation Variant
  const linkUnderline = {
    hidden: { width: 0 },
    visible: { width: "100%", transition: { duration: 0.3 } }
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-all">
      
      {/* --- Logo --- */}
      <Link to='/'>
        <motion.img 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            src={assets.logo} 
            className='w-36 cursor-pointer' 
            alt="Logo" 
        />
      </Link>

      {/* --- Desktop Menu --- */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item, index) => {
            const path = item === 'HOME' ? '/' : `/${item.toLowerCase()}`;
            return (
                <NavLink key={index} to={path} className="flex flex-col items-center gap-1 group">
                    {({ isActive }) => (
                        <>
                           <p className="group-hover:text-black transition-colors">{item}</p>
                           {/* Animated Line */}
                           <motion.div 
                             className={`h-[1.5px] bg-gray-700 ${isActive ? 'w-2/4' : 'w-0'} group-hover:w-2/4 transition-all duration-300`}
                           ></motion.div>
                        </>
                    )}
                </NavLink>
            )
        })}
      </ul>

      {/* --- Icons Section --- */}
      <div className="flex items-center gap-6">
        
        {/* Search Icon */}
        <motion.img 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSearch(true)} 
            src={assets.search_icon} 
            className='w-5 cursor-pointer hover:opacity-80' 
            alt="Search" 
        />

        {/* Profile Dropdown */}
        <div className="group relative">
            <motion.img 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => token ? null : navigate('/login')} 
                className='w-5 cursor-pointer hover:opacity-80' 
                src={assets.profile_icon} 
                alt="Profile" 
            />
            
            {/* Dropdown Menu (Hover based) */}
            {token && 
                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
                    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-xl border border-gray-200 animate-fade-in-down">
                        <p onClick={() => navigate('/my-profile')} className='cursor-pointer hover:text-black hover:bg-white px-2 py-1 rounded transition-all'>My Profile</p>
                        <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black hover:bg-white px-2 py-1 rounded transition-all'>Orders</p>
                        <p onClick={logout} className='cursor-pointer hover:text-rose-500 hover:bg-white px-2 py-1 rounded transition-all'>Log Out</p>
                    </div>
                </div>
            }
        </div>

        {/* Cart Icon */}
        <Link to='/cart' className='relative'>
            <motion.img 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                src={assets.cart_icon} 
                className='w-5 min-w-5 cursor-pointer hover:opacity-80' 
                alt="Cart" 
            />
            {/* Badge Animation */}
            <AnimatePresence>
                {getCartCount() > 0 && (
                    <motion.p 
                        key={getCartCount()} // Key change triggers animation
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'
                    >
                        {getCartCount()}
                    </motion.p>
                )}
            </AnimatePresence>
        </Link>

        {/* Mobile Menu Icon */}
        <motion.img 
            whileTap={{ scale: 0.9 }}
            onClick={() => setVisible(true)} 
            src={assets.menu_icon} 
            className='w-5 cursor-pointer sm:hidden' 
            alt="Menu" 
        />
      </div>

      {/* --- Sidebar for Mobile (Drawer) --- */}
      <AnimatePresence>
        {visible && (
            <>
                {/* Backdrop Overlay */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={()=>setVisible(false)}
                    className="fixed inset-0 bg-black/50 z-40 sm:hidden backdrop-blur-sm"
                ></motion.div>

                {/* Sidebar Content */}
                <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white z-50 w-[75%] sm:hidden shadow-2xl`}
                >
                    <div className="flex flex-col text-gray-600 h-full">
                        <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-5 cursor-pointer border-b hover:bg-gray-50">
                            <motion.img 
                                whileHover={{ rotate: 90 }}
                                src={assets.dropdown_icon} 
                                className='h-4 rotate-180' 
                                alt="Back" 
                            />
                            <p className='font-semibold'>Back</p>
                        </div>
                        
                        {/* Mobile Links */}
                        <div className="flex flex-col p-4 gap-2">
                            {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => {
                                const path = item === 'HOME' ? '/' : `/${item.toLowerCase()}`;
                                return (
                                    <NavLink 
                                        key={item}
                                        onClick={() => setVisible(false)} 
                                        className={({ isActive }) => `py-3 pl-6 border rounded-lg transition-colors ${isActive ? 'bg-black text-white border-black' : 'hover:bg-gray-50 border-gray-100'}`} 
                                        to={path}
                                    >
                                        <p className="font-medium">{item}</p>
                                    </NavLink>
                                )
                            })}
                        </div>
                        
                        {/* Bottom Branding */}
                        <div className="mt-auto p-6 text-center text-xs text-gray-400">
                            <p>Forever You © 2025</p>
                        </div>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;