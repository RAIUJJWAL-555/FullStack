import React from 'react';
import './index.css'; // ✅ Important
import ShopContextProvider from './Context/ShopContext';
import ReactDOM from 'react-dom/client'; // ✅ Corrected 'DOM'
import { BrowserRouter } from 'react-router-dom';
import App from './App'; 



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ShopContextProvider>
  <App />
  </ShopContextProvider>
  </BrowserRouter>
);
