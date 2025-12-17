import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { motion } from "framer-motion";  // ✅ Correct import
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  console.log("Orders Component loaded. Current Token:", token);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      console.log("Token is missing, request skipped.");
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl" // Limit width for better reading
    >
      <div className="mb-6">
         <h3 className="text-xl font-bold text-gray-800">Order Management</h3>
         <p className="text-sm text-gray-500">Track and update customer orders.</p>
      </div>

      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-100 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-sm text-gray-700"
          >
            <div className="flex items-center justify-center bg-gray-50 rounded-lg p-3 h-full"> 
               <img className="w-8 opacity-70" src={assets.parcel_icon} alt="" />
            </div>
            
            <div>
              <div className="mb-2">
                {order.items.map((item, i) => (
                  <p className="py-0.5 font-medium text-gray-800" key={i}>
                    {item.name} <span className="text-gray-500 text-xs ml-1">x {item.quantity}</span> <span className="bg-gray-100 px-2 py-0.5 rounded text-xs ml-1">{item.size}</span>
                    {i !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>
              
              <div className="text-gray-600 space-y-0.5 mt-3">
                 <p className="font-semibold text-gray-900 text-base mb-1">{order.address.firstName + " " + order.address.lastName}</p>
                 <p>{order.address.street}</p>
                 <p>
                    {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
                 </p>
                 <p className="flex items-center gap-1 mt-1">
                    <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">TEL</span> {order.address.phone}
                 </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between md:block">
                 <span className="md:hidden text-gray-500">Items:</span>
                 <p className="text-gray-800 font-medium">Items: <span className="text-primary">{order.items.length}</span></p>
              </div>
              <div className="flex items-center justify-between md:block">
                 <span className="md:hidden text-gray-500">Method:</span>
                 <p>Method: {order.paymentMethod}</p>
              </div>
              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${order.payment ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                 {order.payment ? "PAID" : "PENDING"}
              </div>
               <p className="text-xs text-gray-400 mt-2">Placed: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <div className="font-bold text-lg text-gray-800">
               {currency} {order.amount}
            </div>

            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2.5 font-medium border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-auto"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out of delivery">Out of delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Orders;
