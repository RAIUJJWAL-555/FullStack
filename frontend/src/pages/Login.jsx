import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion"; // Animation Library

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        } else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error(error.message)
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gradient-to-b from-white to-gray-100">
      
      <motion.form
        layout // Important for smooth resizing
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-full max-w-sm bg-white p-8 rounded-2xl shadow-2xl border border-gray-100"
      >
        
        {/* Title Section */}
        <div className="inline-flex items-center gap-2 mb-8">
          <p className="prata-regular text-3xl font-serif text-gray-800">{currentState}</p>
          <motion.hr 
            layoutId="underline"
            className="border-none h-[2px] w-8 bg-black rounded-full" 
          />
        </div>

        {/* Dynamic Inputs Wrapper */}
        <div className="w-full flex flex-col gap-4">
            
            {/* Name Input - Only shows in Sign Up (With Slide Animation) */}
            <AnimatePresence>
              {currentState === "Sign Up" && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    autoComplete="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none transition-all duration-300"
                    placeholder="Name"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.input
              whileFocus={{ scale: 1.01 }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              autoComplete="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none transition-all duration-300"
              placeholder="Email"
              required
            />

            <motion.input
              whileFocus={{ scale: 1.01 }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              autoComplete={currentState === "Login" ? "current-password" : "new-password"}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none transition-all duration-300"
              placeholder="Password"
              required
            />
        </div>

        {/* Links Section */}
        <div className="w-full flex justify-between text-sm mt-4 text-gray-600">
          <p className="cursor-pointer hover:text-black transition-colors">Forgot Password?</p>
          {currentState === "Login" ? (
            <p 
              onClick={() => setCurrentState("Sign Up")} 
              className="cursor-pointer font-medium hover:text-black hover:underline transition-all"
            >
              Create Account
            </p>
          ) : (
            <p 
              onClick={() => setCurrentState("Login")} 
              className="cursor-pointer font-medium hover:text-black hover:underline transition-all"
            >
              Login Here
            </p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-black text-white font-medium px-8 py-3 mt-8 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </motion.button>
        
      </motion.form>
    </div>
  );
};

export default Login;