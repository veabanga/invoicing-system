import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


// @desc Fetch all products
// @route GET /api/products
// @access public
const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({category: 'Product'});
    res.json(products);
})

// @desc Fetch all services
// @route GET /api/products/services
// @access public
const getServices = asyncHandler(async(req,res)=>{
    const products = await Product.find({category: 'Service'});
    res.json(products);
})


export {getProducts, getServices};