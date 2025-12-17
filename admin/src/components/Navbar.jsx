import React from 'react';
import {assets} from '../assets/assets.js'

const Navbar = ({setToken}) => {
  return (
    <div className='sticky top-0 z-50 flex items-center py-3 px-[4%] justify-between bg-white shadow-sm border-b border-gray-100'>
      <div className="flex items-center gap-2">
         <img className='w-[max(10%,100px)]' src={assets.logo} alt="" />
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={()=>setToken('')} 
          className='bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium transition-colors text-sm'
        >
          Logout
        </button>
        {/* Profile Avatar Placeholder for polished look */}
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
          AD
        </div>
      </div>
    </div>
  );
}

export default Navbar;
