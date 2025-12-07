//import { currency } from "../../admin/src/App.jsx"
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import razorpay from "razorpay"

import Stripe from "stripe"

// global variables
const currency = 'usd'
const deliveryCharge= 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayIntance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
    

// Placing orders using COD Medthod
const playOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Place order using Stripe Medthod
const playOrderStripe = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body
        const {origin} = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }        
        
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=> ({
            price_data : {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(Number(item.price) * 100),
            },
            quantity: item.quantity

        }))

        line_items.push({
            price_data : {
                currency: currency,
                product_data: {
                    name: 'Delivery Charge'
                },
                unit_amount: Math.round(Number(deliveryCharge) * 100),
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({

            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'

        })

        res.json({success:true, session_url:session.url})


    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })
        
    }
    
}

// Verify Stripe payment and update order status
const verifyStripe = async (req,res) => {

    const { orderId, success, userId } = req.body;
    try {

        if (success==='true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true, message: 'Payment Verified and Order Placed' })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: 'Payment Failed, Order Cancelled' })

        }
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Place order using RazorPay Medthod
const playOrderRazorpay= async (req, res) => {

    try {
        
        const { userId, items, amount, address } = req.body
        

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }        
        
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: Math.round(Number(amount) * 100),  // amount in the smallest currency unit
            currency: (currency || 'USD').toUpperCase(),
            receipt: newOrder._id.toString()

        }

        try {
            const order = await razorpayIntance.orders.create(options)
            return res.json({ success: true, order })
        } catch (err) {
            console.log('Razorpay create order error:', err)
            return res.json({ success: false, message: err && err.message ? err.message : err })
        }


    } catch (error) {
        
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// verify Razorpay payment and update order status
const verifyRazorpay = async (req,res) => {

    try {
        
        const {userId, razorpay_order_id} = req.body
        const orderInfo = await razorpayIntance.orders.fetch(razorpay_order_id)
        //console.log(orderInfo);
        if (orderInfo && orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true, message: 'Payment Successful' })
        } else {
            res.json({ success: false, message: 'Payment Not Successful' })
        }

    } catch (error) {
        
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// ALL Order data for admin Pannel 
const allOrders = async (req,res) => {

    try {
        
        const {userId, razorpay_order_id} = req.body
        const orderInfo = await razorpayIntance.orders.fetch(razorpay_order_id)
        console.log(orderInfo);
        

    } catch (error) {
        
    }



    try {
    console.log('allOrders controller called by', req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress)
    console.log('headers:', req.headers && { token: req.headers.token })
        
        const orders = await orderModel.find({})
        res.json({success:true, orders})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }

}

// User Order data for frontend
const userOders = async (req,res) => {

    try {
      
        const {userId} = req.body;

        const orders = await orderModel.find({userId})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }

}

// update order status from admin pannel
const updateStatus = async (req,res) => {

    try {
        
        const { orderId, status} = req.body

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true, message:'Status Updated'})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
    
}

export {playOrder,playOrderRazorpay,playOrderStripe,allOrders,userOders,updateStatus, verifyStripe, verifyRazorpay}
