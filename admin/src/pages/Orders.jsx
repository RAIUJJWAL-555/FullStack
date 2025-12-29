import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion"; 
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    if (!token) return null;
    setLoading(true);
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse()); // Newest first
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
        toast.success("Order status updated!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // Helper for Status Colors
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'border-green-500 bg-green-50 text-green-700';
      case 'Shipped': return 'border-blue-500 bg-blue-50 text-blue-700';
      case 'Packing': return 'border-orange-500 bg-orange-50 text-orange-700';
      default: return 'border-gray-300 bg-white text-gray-700';
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* --- Header --- */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <div>
            <h3 className="text-2xl font-bold text-gray-800">Orders</h3>
            <p className="text-sm text-gray-500 mt-1">Manage and track all customer orders.</p>
         </div>
         <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold">
           {orders.length} Total Orders
         </span>
      </div>

      {/* --- Order List --- */}
      {loading ? (
        <div className="flex flex-col gap-4">
           {[1,2,3].map(i => <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse"/>)}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
           <p className="text-gray-400 text-lg">No orders placed yet.</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          {orders.map((order) => (
            <motion.div
              key={order._id}
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-6 items-start border border-gray-100 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-sm"
            >
              
              {/* 1. Icon Section */}
              <div className="hidden lg:flex items-center justify-center bg-gray-50 rounded-lg h-full min-h-[100px]"> 
                 <img className="w-12 opacity-60" src={assets.parcel_icon} alt="Package" />
              </div>

              {/* 2. Customer & Items Details */}
              <div className="flex flex-col gap-4">
                {/* Items List */}
                <div>
                  {order.items.map((item, i) => (
                    <p className="text-gray-800 font-medium leading-relaxed" key={i}>
                      {i + 1}. {item.name} 
                      <span className="text-gray-500 text-xs ml-2">
                        Qty: {item.quantity} | Size: {item.size}
                      </span>
                    </p>
                  ))}
                </div>
                
                {/* Customer Address */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                   <p className="font-bold text-gray-900 mb-2">{order.address.firstName + " " + order.address.lastName}</p>
                   <p className="text-gray-600">{order.address.street}</p>
                   <p className="text-gray-600">
                      {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                   </p>
                   <p className="flex items-center gap-2 mt-2 text-gray-700 font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      {order.address.phone}
                   </p>
                </div>
              </div>

              {/* 3. Payment & Date Info */}
              <div className="flex flex-col gap-3">
                 <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Total Amount</p>
                    <p className="text-xl font-bold text-gray-800">{currency}{order.amount}</p>
                 </div>
                 
                 <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Payment</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="font-medium text-gray-700">{order.paymentMethod}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${order.payment ? 'bg-green-50 text-green-600 border-green-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'}`}>
                           {order.payment ? "PAID" : "PENDING"}
                        </span>
                    </div>
                 </div>

                 <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Date</p>
                    <p className="text-gray-700">{new Date(order.date).toLocaleDateString()}</p>
                 </div>
              </div>

              {/* 4. Action Status */}
              <div className="flex flex-col gap-2">
                 <p className="text-xs text-gray-500 uppercase font-semibold">Order Status</p>
                 <div className="relative">
                    <select
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status}
                      className={`w-full p-2.5 font-semibold rounded-lg border-2 outline-none cursor-pointer appearance-none transition-colors ${getStatusColor(order.status)}`}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                       <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                 </div>
                 
                 {/* Visual Status Bar (Optional) */}
                 {order.status === 'Delivered' && (
                     <div className="mt-2 flex items-center gap-2 text-green-600 text-xs font-bold bg-green-50 p-2 rounded justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Completed
                     </div>
                 )}
              </div>

            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Orders;