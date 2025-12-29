import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion'; // Animation Library

const Sidebar = () => {

  // Navigation Data to keep code clean
  const navLinks = [
    { name: "Add Items", icon: assets.add_icon, path: "/add" },
    { name: "List Items", icon: assets.order_icon, path: "/list" },
    { name: "Orders", icon: assets.order_icon, path: "/orders" },
  ];

  return (
    <div className='w-[18%] min-h-screen bg-[#1e1e2d] border-r border-gray-800 flex flex-col shadow-2xl transition-all duration-300'>
      
      {/* --- Logo Area --- */}
      <div className='h-20 flex items-center justify-center border-b border-gray-800/50'> 
         <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='flex items-center gap-2 cursor-default'
         >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className='text-white font-bold text-xl'>A</span>
            </div>
            <span className='font-bold text-xl text-white tracking-wider hidden md:block'>
                ADMIN
            </span>
         </motion.div>
      </div>

      {/* --- Navigation Links --- */}
      <div className='flex flex-col gap-3 pt-8 px-3'>
        {navLinks.map((item, index) => (
            <NavLink 
                key={index}
                to={item.path} 
                className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden
                    ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                `}
            >
                {({ isActive }) => (
                    <>
                        {/* Active Indicator Line (Left Side) */}
                        {isActive && (
                            <motion.div 
                                layoutId="active-pill" 
                                className="absolute left-0 top-0 bottom-0 w-1 bg-white/20"
                            />
                        )}

                        {/* Icon */}
                        <motion.img 
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className={`w-5 h-5 object-contain transition-all duration-300 ${isActive ? 'brightness-0 invert' : 'opacity-60 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert'}`} 
                            src={item.icon} 
                            alt={item.name} 
                        />
                        
                        {/* Text (Hidden on small screens) */}
                        <p className='hidden md:block font-medium text-sm tracking-wide z-10'>
                            {item.name}
                        </p>

                        {/* Hover Chevron (Right Side) */}
                        <motion.svg 
                           initial={{ x: -10, opacity: 0 }}
                           whileHover={{ x: 0, opacity: 1 }}
                           className={`w-4 h-4 ml-auto hidden md:block ${isActive ? 'hidden' : ''}`} // Active hone par chevron mat dikhao
                           fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                    </>
                )}
            </NavLink>
        ))}
      </div>

      {/* --- Bottom User Card --- */}
      <div className="mt-auto p-4 hidden md:block">
         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700/50 shadow-lg">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold border border-indigo-500/30">
                    AD
                </div>
                <div>
                    <p className="text-sm font-semibold text-white">System Admin</p>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide">Online</p>
                    </div>
                </div>
            </div>
         </div>
      </div>

    </div>
  );
}

export default Sidebar;