import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence, motion } from 'framer-motion'; // Animation Library

// --- Components & Pages ---
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Order from './pages/Order';
import Product from './pages/Product';
import PlaceOrder from './pages/PlaceOrder';
import Verify from './pages/Verify';
import MyProfile from './pages/MyProfile';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

// --- Scroll To Top Component ---
// Ye component ensure karega ki route change hone par page top se shuru ho
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Page Animation Wrapper ---
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const App = () => {
  const location = useLocation(); // Current route track karne ke liye

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-screen flex flex-col bg-white">
     
     {/* Global Utilities */}
     <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />
     <ScrollToTop /> 
     
     {/* Static Elements (Navbar always visible) */}
     <Navbar/>
     <SearchBar/>

     {/* Dynamic Routes with Animation */}
     <div className="flex-1"> {/* Flex-1 ensures footer pushes to bottom if content is less */}
       <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          
          <Route path="/" element={<PageWrapper><Home/></PageWrapper>} />
          <Route path="/collection" element={<PageWrapper><Collection/></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About/></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact/></PageWrapper>} />
          <Route path="/product/:productId" element={<PageWrapper><Product/></PageWrapper>} />
          <Route path='/cart' element={<PageWrapper><Cart/></PageWrapper>}/>
          <Route path="/login" element={<PageWrapper><Login/></PageWrapper>} />
          <Route path="/place-order" element={<PageWrapper><PlaceOrder/></PageWrapper>} />
          <Route path="/orders" element={<PageWrapper><Order/></PageWrapper>} />
          <Route path="/my-profile" element={<PageWrapper><MyProfile/></PageWrapper>} />
          <Route path="/verify" element={<PageWrapper><Verify/></PageWrapper>} />
          
        </Routes>
       </AnimatePresence>
     </div>

     <Footer/>
    </div>
  );
}

export default App;