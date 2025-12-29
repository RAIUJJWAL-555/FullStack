import axios from 'axios';
import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../Context/ShopContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Animation Library

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('cod');
  const { backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }
      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  // Animation Variants
  const inputHover = { focus: { scale: 1.01, borderColor: "#000", transition: { duration: 0.2 } } };

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={onSubmitHandler} 
      className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t bg-gray-50 px-4 sm:px-10 pb-20'
    >
      
      {/* ------------ Left Side (Billing Details) ------------ */}
      <div className="flex flex-col gap-6 w-full sm:max-w-[480px]">
          
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={"DELIVERY"} text2={'INFORMATION'}/>
          </div>
          
          <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex gap-3">
              <motion.input whileFocus="focus" variants={inputHover} required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded-md py-2.5 px-3.5 w-full outline-none transition-colors' type="text" placeholder='First Name' />
              <motion.input whileFocus="focus" variants={inputHover} required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded-md py-2.5 px-3.5 w-full outline-none transition-colors' type="text" placeholder='Last Name' />
            </div>
            <motion.input whileFocus="focus" variants={inputHover} required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded-md py-2.5 px-3.5 w-full outline-none transition-colors' type="email" placeholder='Enter your Email Address' />
            <motion.input whileFocus="focus" variants={inputHover} required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded-md py-2.5 px-3.5 w-full outline-none transition-colors' type="text" placeholder='Street Address' />
            
            <div className="flex gap-3">
              <motion.input whileFocus="focus" variants={inputHover} required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded-md py-2.5 px-3.5 w-full outline-none transition-colors' type="text" placeholder='City' />
              <motion.input whileFocus="focus" variants={inputHover} required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded-md py-2.5 px-3.5 w-full outline-none transition-colors' type="text" placeholder='State' />
            </div>
            
            <div className="flex gap-3">
              <motion.input whileFocus="focus" variants={inputHover} required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded-md py-2.5 px-3.5 w-full outline-none transition-colors' type="number" placeholder='Zipcode' />
              <motion.input whileFocus="focus" variants={inputHover} required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded-md py-2.5 px-3.5 w-full outline-none transition-colors' type="text" placeholder='Country' />
            </div>
            <motion.input whileFocus="focus" variants={inputHover} required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded-md py-2.5 px-3.5 w-full outline-none transition-colors' type="number" placeholder='Phone Number' />
          </div>
      </div>

      {/* ------------ Right Side (Cart Total & Payment) ------------ */}
      <div className="mt-8 w-full sm:w-auto flex-1">
           <div className="sm:sticky sm:top-24 flex flex-col gap-8">
               
               {/* Cart Summary */}
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                   <CartTotal/>
               </div>

               {/* Payment Method Selection */}
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <Title text1={'PAYMENT'} text2={'METHOD'}/>
                
                <div className="flex flex-col gap-3 lg:flex-row mt-4">
                  
                  {/* Stripe Option */}
                  <motion.div 
                    onClick={() => setMethod('stripe')} 
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center gap-3 border p-3 px-4 rounded-lg cursor-pointer transition-all ${method === 'stripe' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-200'}`}
                  >
                    <div className={`min-w-4 h-4 rounded-full border flex items-center justify-center ${method === 'stripe' ? 'border-green-600' : 'border-gray-300'}`}>
                        {method === 'stripe' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}
                    </div>
                    <img className='h-5 mx-2 object-contain' src={assets.stripe_logo} alt="Stripe" />
                  </motion.div>

                  {/* Razorpay Option */}
                  <motion.div 
                    onClick={() => setMethod('razorpay')}
                    whileHover={{ scale: 1.02 }} 
                    className={`flex items-center gap-3 border p-3 px-4 rounded-lg cursor-pointer transition-all ${method === 'razorpay' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-200'}`}
                  >
                    <div className={`min-w-4 h-4 rounded-full border flex items-center justify-center ${method === 'razorpay' ? 'border-green-600' : 'border-gray-300'}`}>
                        {method === 'razorpay' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}
                    </div>
                    <img className='h-5 mx-2 object-contain' src={assets.razorpay_logo} alt="Razorpay" />
                  </motion.div>

                  {/* COD Option */}
                  <motion.div 
                    onClick={() => setMethod('cod')} 
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center gap-3 border p-3 px-4 rounded-lg cursor-pointer transition-all ${method === 'cod' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-200'}`}
                  >
                    <div className={`min-w-4 h-4 rounded-full border flex items-center justify-center ${method === 'cod' ? 'border-green-600' : 'border-gray-300'}`}>
                        {method === 'cod' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}
                    </div>
                    <p className='text-gray-500 text-sm font-medium mx-2 whitespace-nowrap'>CASH ON DELIVERY</p>
                  </motion.div>
                
                </div>

                <div className="w-full text-end mt-8">
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: "#000" }}
                    whileTap={{ scale: 0.95 }}
                    type='submit' 
                    className='bg-black text-white px-16 py-4 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto'
                  >
                    PLACE ORDER
                  </motion.button>
                </div>
               </div>
           </div>
      </div>
    </motion.form>
  );
}

export default PlaceOrder;