import express from 'express'
import { playOrder, playOrderRazorpay, playOrderStripe, allOrders,userOders,updateStatus, verifyStripe, verifyRazorpay } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// admin features
orderRouter.post('/list', adminAuth ,allOrders)
orderRouter.post('/status', adminAuth , updateStatus)

// payment features
orderRouter.post('/place', authUser ,playOrder)
orderRouter.post('/stripe' , authUser, playOrderStripe)
orderRouter.post('/razorpay', authUser, playOrderRazorpay)

// User Features
orderRouter.post('/userorders', authUser, userOders)

// verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

export default orderRouter

