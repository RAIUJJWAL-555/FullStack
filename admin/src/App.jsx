import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import List from "./pages/List";
import Login from "./components/Login";

 export const backendUrl = import.meta.env.VITE_BACKEND_URL
 export const currency = '$'


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  useEffect (()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    <div className="bg-gray-50 min-h-screen font-outfit">
      <ToastContainer/>

      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="flex w-full min-h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1 w-full overflow-hidden">
             <Navbar setToken={setToken} />
             <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50/50">
                <div className="max-w-7xl mx-auto w-full"> {/* Container to constrain width on large screens */}
                    <Routes>
                      <Route path="/" element={<h1 className="text-2xl font-bold text-gray-800">Welcome Admin</h1>} />
                      <Route path="/add" element={<Add token={token} />} />
                      <Route path="/orders" element={<Orders token={token} />} />
                      <Route path="/list" element={<List token={token} />} />
                    </Routes>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
