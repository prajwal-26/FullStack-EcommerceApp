const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
//create product -- admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//get all product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    message: "route is working",
    products,
  });
});

//Get product Details
exports.getProductDetails =catchAsyncErrors( async(req,res,next) => {
    let product = await Product.findById(req.params.id);
   
    if (!product) {
        return next(new ErrorHander("Product not found",404))
      }

      res.status(200).json({
        success: true,
         product
      })
});

//update product --admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
     return next(new ErrorHander("Product not found",404))

  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//Delete product
exports.deleteProduct = catchAsyncErrors(async(req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found",404))

  }
  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Producted deleted successfully",
  })
});
