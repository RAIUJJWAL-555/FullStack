import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col'>
      {/* Logo Area */}
      <div className='h-16 flex items-center justify-center border-b border-slate-800 shadow-sm'> 
         <span className='font-bold text-2xl text-white tracking-wider flex items-center gap-2'>
            <span className='text-primary'>•</span> ADMIN
         </span>
      </div>

      <div className='flex flex-col gap-2 pt-8 px-4'>
        <NavLink 
          to="/add" 
          className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive ? 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-105' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <img className={`w-5 h-5 transition-all duration-300 ${ window.location.pathname === '/add' ? 'brightness-0 invert scale-110' : 'opacity-60 group-hover:opacity-100 group-hover:scale-110'}`} src={assets.add_icon} alt="" /> 
          <p className='hidden md:block font-medium z-10'>Add Items</p>
        </NavLink>

        <NavLink 
          to="/list" 
          className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive ? 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-105' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <img className={`w-5 h-5 transition-all duration-300 ${ window.location.pathname === '/list' ? 'brightness-0 invert scale-110' : 'opacity-60 group-hover:opacity-100 group-hover:scale-110'}`} src={assets.order_icon} alt="" />
          <p className='hidden md:block font-medium z-10'>List Items</p>
        </NavLink>

        <NavLink 
          to="/orders" 
          className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive ? 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-105' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <img className={`w-5 h-5 transition-all duration-300 ${ window.location.pathname === '/orders' ? 'brightness-0 invert scale-110' : 'opacity-60 group-hover:opacity-100 group-hover:scale-110'}`} src={assets.order_icon} alt="" />
          <p className='hidden md:block font-medium z-10'>Orders</p>
        </NavLink>
      </div>

      {/* Optional decorative bottom element */}
      <div className="mt-auto p-6 hidden md:block">
         <div className="bg-slate-800 rounded-xl p-4 text-center">
            <p className="text-xs text-slate-400 mb-2">Logged in as Admin</p>
            <div className="h-1 w-12 bg-primary mx-auto rounded-full"></div>
         </div>
      </div>
    </div>
  );
}

export default Sidebar;
