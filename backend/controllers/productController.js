import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';


// function for addproduct controller
const addProduct = async (req, res) => {
    try {
        // Log toàn bộ body để debug
        //console.log('Full req.body:', req.body);
        //console.log('All body keys:', Object.keys(req.body));

        const { name, description, price, category, subCategory, size, bestseller } = req.body;

        // Log incoming fields for easier debugging
        //console.log('Extracted body:', { name, description, price, category, subcategory, size, bestseller });
        //console.log('req.files:', req.files);

        // Safely access files produced by multer.fields()
        const image1= req.files.image1 && req.files.image1[0]
        const image2= req.files.image2 && req.files.image2[0]
        const image3= req.files.image3 && req.files.image3[0]
        const image4= req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined);

        let imageUrl = await Promise.all(
            images.map(async (item) => {

                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url;

            })
        )

        const productData = {
            name,
            description,
            price : Number(price),
            category,
            subCategory,
            size: JSON.parse(size),
            bestseller : bestseller === 'true' ? true : false,
            images: imageUrl,
            date : Date.now()
        }

        console.log('Product Data to be saved:', productData);
        
        const product = new productModel(productData);
        await product.save();

        res.json({success:true, message:"Product added successfully"});

        /**
        console.log(name, description, price, category, subcategory, size, bestseller);
        console.log(imageUrl);
        res.json({});
        **/
       
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
};
// funtion for remove product controller
const removeProduct = async (req, res) => {

    try {
        
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Product removed successfully"});

    } catch (error) {

        console.log(error);
        res.json({success:false, message:error.message});
        
    }

}

// function for list products controller
const listProducts = async (req, res) => {

    try {
        
        const products = await productModel.find({})
        res.json({success:true, products})


    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }    

}

// function for single product info controller
const singleProduct = async (req, res) => {

    try {
        
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true, product});


    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }

}




export {addProduct, removeProduct, listProducts, singleProduct};
