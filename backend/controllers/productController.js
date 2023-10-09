import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


// @desc Fetch all products
// @route GET /api/products
// @access public
const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.json(products);
})

// remove if not needed
const getProductsById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if (product) {
        return res.json(product);
    }
    else{
        res.status(404);
        throw new Error('Resource Not Found'); 
    }
})

export {getProducts, getProductsById};