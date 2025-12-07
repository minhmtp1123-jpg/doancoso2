import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req , res) => {

    try {
        
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false , message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true , token})

        } else {
            res.json({success:false , message: "Invalid credentials"})
        }

    } catch (error) {
        console.error("Error in user login:", error)
        res.json({success:false , message: error.message || "An error occurred during login"})
    }

}

// Route for user registration
const registerUser = async (req , res) => {

    try {

        const {name, email, password} = req.body
        // check if user already exists
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.json({success:false , message: "User already exists"})
        }

        // validate email format and password strength
        if (!validator.isEmail(email)) {
            return  res.json({success:false , message: "Invalid email format"})
        }

        if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            return res.json({success:false , message: "Password is not strong enough. It should be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols."})
        }

        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({success:true , token})
        
    } catch (error) {
        console.error("Error in user registration:", error)
        res.json({success:false , message: error.message || "An error occurred during registration"})
    }

}

// Route for admin login
const adminLogin = async (req , res) => {

    try {
        
        const {email, password} = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign({email}, process.env.JWT_SECRET)
            res.json({success:true , token})
 
        } else {
            res.json({success:false , message: "Invalid admin credentials"})
        }

    } catch (error) {
        console.error("Error in admin login:", error)
        res.json({success:false , message: error.message || "An error occurred during admin login"})
    }

}

export {loginUser,registerUser,adminLogin}