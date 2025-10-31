import express from "express";
import {placeOrder,placeOrderRazorpay,placeOrderStripe,verifyStripe,allOrders,userOrders,updateStatus} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"

const orderRouter = express.Router()

// admin feature 
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment featuree
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)
orderRouter.post('/verifyStripe',authUser,verifyStripe)

// user feature 
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter