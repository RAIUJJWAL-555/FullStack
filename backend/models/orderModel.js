// import orderModel from "../controllers/orderController";
// import userModel from "./userModel";


// // placing order using COD 
// const placeOrder = async (req,res)=>{
//   try {
//     const { userId,items,amount, address} = req.body;

//     const orderData = {
//         userId,
//         items,
//         amount,
//         address,
//         paymentMethod:"COD",
//         payment:false,
//         date:Date.now()

//     }

//     const newOrder = new orderModel(orderData)
//     await newOrder.save()

//     await userModel.findByIdAndUpdate(userId,{cartData:{}})

//     res.json({success:true,message:"Order placed"})

//   } catch (error) {
//     console.log(error);
//     res.json({success:false,message:error.message})
//   }
// }
// // placing order using stripe 
// const placeOrderStripe = async (req,res)=>{
    
// }
// // placing order using razor[ay] 
// const placeOrderRazorpay = async (req,res)=>{
    
// }
// // all order data for admin panel
// const allOrders = async (req,res)=>{
    
// }
// // user order data for frontend
// const userOrders = async (req,res)=>{
    
// }
// // update order status from admin panel
// const updateStatus = async (req,res)=>{
    
// }
// export {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus}
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false }, // Boolean, not string
  date: { type: Number, required: true },
});


const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
