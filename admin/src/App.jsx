import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // useLocation added
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence, motion } from "framer-motion"; // Animation Library

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import List from "./pages/List";
import Login from "./components/Login";
import { assets } from "./assets/assets";

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

// --- Internal Dashboard Home Component ---
const DashboardHome = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col gap-6"
  >
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
       <div>
         <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Admin! 👋</h1>
         <p className="text-gray-500 mt-2">Here's what's happening in your store today.</p>
       </div>
       <div className="hidden md:block w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-4xl">
         🚀
       </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {/* Quick Stat Cards (Static for visual) */}
       <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-gray-500 text-sm font-medium">Total Products</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">Manage Inventory</p>
          <div className="mt-4 h-1 w-full bg-gray-100 rounded-full"><div className="h-1 w-[70%] bg-indigo-500 rounded-full"></div></div>
       </div>
       <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-gray-500 text-sm font-medium">Pending Orders</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">Check Orders</p>
          <div className="mt-4 h-1 w-full bg-gray-100 rounded-full"><div className="h-1 w-[40%] bg-orange-500 rounded-full"></div></div>
       </div>
       <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-gray-500 text-sm font-medium">System Status</p>
          <p className="text-2xl font-bold text-green-600 mt-1">Active</p>
          <div className="mt-4 h-1 w-full bg-gray-100 rounded-full"><div className="h-1 w-[90%] bg-green-500 rounded-full"></div></div>
       </div>
    </div>
  </motion.div>
);

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  
  // Hook to detect route changes for animation
  const location = useLocation(); 

  useEffect (() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className="bg-gray-50 min-h-screen font-outfit text-gray-800">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />

      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="flex w-full min-h-screen">
          <Sidebar />
          
          <div className="flex flex-col flex-1 w-full overflow-hidden">
             <Navbar setToken={setToken} />
             
             <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 scroll-smooth">
                <div className="max-w-7xl mx-auto w-full"> 
                    
                    {/* AnimatePresence enables exit animations */}
                    <AnimatePresence mode="wait">
                      <Routes location={location} key={location.pathname}>
                        
                        <Route path="/" element={<DashboardHome />} />
                        
                        <Route path="/add" element={
                          <PageWrapper>
                             <Add token={token} />
                          </PageWrapper>
                        } />
                        
                        <Route path="/orders" element={
                          <PageWrapper>
                             <Orders token={token} />
                          </PageWrapper>
                        } />
                        
                        <Route path="/list" element={
                          <PageWrapper>
                             <List token={token} />
                          </PageWrapper>
                        } />

                      </Routes>
                    </AnimatePresence>
                
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Reusable Page Wrapper for consistent transitions ---
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

export default App;