import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'; // Animation Library

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Welcome back, Admin!");
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

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden'>
      
      {/* --- Animated Background Blobs --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-[100px]"
          ></motion.div>
          <motion.div 
            animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-bl from-pink-200/40 to-orange-100/40 rounded-full blur-[100px]"
          ></motion.div>
          <motion.div 
             animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
             transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
             className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-gradient-to-tr from-teal-200/40 to-green-100/40 rounded-full blur-[100px]"
          ></motion.div>
      </div>

      {/* --- Login Card --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white/70 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-full max-w-md border border-white/60 z-10 mx-4'
      >
        <div className="flex flex-col items-center mb-8">
            <h1 className='text-3xl font-bold text-gray-800 tracking-tight font-serif'>Admin Panel</h1>
            <p className="text-gray-500 mt-2 text-sm">Sign in to manage your inventory</p>
        </div>
        
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-6'>
          
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Email Address</label>
            <div className="relative group">
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email} 
                  className='w-full pl-10 h-12 rounded-lg border border-gray-300 bg-white/50 focus:bg-white outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300' 
                  type="email" 
                  placeholder='admin@forever.com' 
                  required 
                />
                 <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
            </div>
          </div>

          {/* Password Input */}
          <div>
             <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Password</label>
             <div className="relative group">
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password} 
                  className='w-full pl-10 h-12 rounded-lg border border-gray-300 bg-white/50 focus:bg-white outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300' 
                  type="password" 
                  placeholder='••••••••' 
                  required 
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
             </div>
          </div>

          {/* Submit Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            disabled={loading}
            className='bg-black text-white mt-2 py-3.5 rounded-lg text-lg font-semibold w-full flex items-center justify-center gap-2 shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <>
                   LOGIN 
                </>
            )}
          </motion.button>
        </form>
        
        <p className="text-center text-xs text-gray-400 mt-8">
            Secured by Forever Admin Systems © 2025
        </p>
      </motion.div>
    </div>
  );
}

export default Login;