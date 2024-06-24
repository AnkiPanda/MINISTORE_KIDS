const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ApiFeatures = require("../utils/apifeatures")
const cloudinary = require('cloudinary')

// Create Product : Admin
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{

    let images = []
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }
    
      const imagesLinks = [];
    
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
    
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    
        req.body.images = imagesLinks;
        req.body.user = req.user.id;
        const product = await Product.create(req.body);
        res.status(201).json({
            success:true,
            product
        })
})


// Get All Products
exports.getAllProducts = catchAsyncErrors(async(req,res,next)=>{
    
    const resultPerPage = 8
    const productCount = await Product.countDocuments();
    //console.log(req.query)
   const apifeatures = new ApiFeatures(Product.find(),req.query)
   .search()
   .filter()

   let products = await apifeatures.query;
    //console.log(products)
   let filterProductsCount = products.length
    apifeatures.pagination(resultPerPage)
    products = await apifeatures.query.clone();
    console.log(products)
    //return next(new ErrorHandler("Product not Found",404))
    res.status(200).json({
        success:true,
        products,
        productCount,
        resultPerPage,
        filterProductsCount
    })
})

//Get all products for admin
exports.getAllProductsForAdmin = catchAsyncErrors(async(req,res,next)=>{
    const productCount = await Product.countDocuments();
    const products = await Product.find()
    res.status(200).json({
        success: true,
        products,
        productCount
    })
})

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not Found",404))
    }
    
    res.status(200).json({
        success: true,
        product
    })
})

//Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not Found",404))
    }

    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
  console.log(images)
  const imagesLinks = [];
  if (images !== undefined) {
    //Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        let flag1 = false
        for (let j = 0; j < images.length; j++) {
            if(product.images[i].url === images[j]){
                flag1 = true;
                break;
            }
        }
      if(!flag1){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
      else{
        imagesLinks.push(product.images[i])
      }
    }
    
    
    console.log(imagesLinks)
    
    for (let i = 0; i < images.length; i++) {
        let flag = false;
        for(let j = 0; j < product.images.length; j++){
            if(images[i] === product.images[j].url){
                flag=true;
                break
            }
        }
        if(!flag){
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
              });
              console.log(result)
              imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
              });
        }  
    }
    console.log(imagesLinks)
    req.body.images = imagesLinks;
  }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true,
        product
    })
    
})


//Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not Found",404))
    }
    product = await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
        product
    })
})

// Create New Review or Update Review
exports.createProductReview = catchAsyncErrors( async(req,res,next)=>{
    
    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(rev=> rev.user.toString()===req.user._id.toString())

    if(isReviewed){
        product.reviews.forEach(rev =>{
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = Number(rating);
                rev.comment = comment;
            }
        })
    }
    else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach(rev =>{
        avg+=rev.rating;
    })
    product.ratings = avg/product.reviews.length

    await product.save({ validateBeforeSave: false});

    res.status(200).json({
        success: true,
        product

    })
    
})

// Get ALl Reviews of a product
exports.getProductReviews = catchAsyncErrors( async(req,res,next)=>{
    console.log(req.query.id)
    const product = await Product.findById(req.query.id)
    if(!product){
        return next(new ErrorHandler("Product not Found",404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews

    })

})

// Delete Review
exports.deleteReview = catchAsyncErrors( async(req,res,next)=>{
    console.log(req)
    console.log(req.query.productId)
    const product = await Product.findById(req.query.productId)
    if(!product){
        return next(new ErrorHandler("Product not Found",404))
    }
    console.log(req.query.id)
    console.log(product.reviews)
    const reviews = product.reviews.filter(rev=> rev._id.toString() !== req.query.id.toString())

    let avg = 0;
    console.log(reviews)
    reviews.forEach(rev =>{
        avg+=rev.rating;
    })
    
    const ratings = avg === 0 ? avg: avg/reviews.length
    console.log(ratings)
    const numOfReviews = reviews.length
    console.log(numOfReviews)
    //console.log(reviews)

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true

    })

})
