import userModel from "../models/userModel.js";


// Add product to user cart
const addToCart = async (req, res) => {

    try {
        
        const { userId, itemId, size } = req.body;

        if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' })
        if (!itemId || !size) return res.status(400).json({ success: false, message: 'Missing itemId or size' })

        const userData = await userModel.findById(userId)
        if (!userData) return res.status(404).json({ success: false, message: 'User not found' })

        let cartData = userData.cartData || {}

        if (!cartData[itemId]) cartData[itemId] = {}
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: 'Added to cart' })
        

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})

    }

}

const updateCart = async (req, res) => {

    try {
        
        const { userId, itemId, size, quantity } = req.body;

        if (!userId || !itemId || !size) return res.status(400).json({ success: false, message: 'Missing required fields' })

        const userData = await userModel.findById(userId)
        if (!userData) return res.status(404).json({ success: false, message: 'User not found' })

        let cartData = userData.cartData || {}
        if (!cartData[itemId]) cartData[itemId] = {}
        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: 'Cart Updated' })


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

const getUserCart = async (req, res) => {

    try {
        
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' })

        const userData = await userModel.findById(userId)
        if (!userData) return res.status(404).json({ success: false, message: 'User not found' })

        let cartData = userData.cartData || {}

        res.json({ success: true, cartData })

    } catch (error) {
        
        console.log(error)
        res.json({success:false, message:error.message})

    }

}

export  {addToCart, updateCart, getUserCart}
