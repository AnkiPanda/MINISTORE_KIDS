const User = require("../models/userModel")
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Add to Cart
exports.addToCart =  catchAsyncErrors( async(req,res,next)=>{
    const cartItem = req.body;
    
    let user = await User.findById(req.user._id) 
    //console.log(user)
    let cartItems = user.cartItems ? user.cartItems : []
    //console.log(cartItems)
   // Check if the product already exists in the cart
   const existingItemIndex = cartItems.findIndex((item) => item.product.toString() === cartItem.product.toString());
   console.log(existingItemIndex)
   if (existingItemIndex !== -1) {
       // If the product exists, update its quantity
       cartItems[existingItemIndex] = cartItem;
   } else {
       // If the product doesn't exist, add it to the cart
       cartItems.push(cartItem);
   }

   // Update the user's cartItems and save the user
   user.cartItems = cartItems;
    //console.log(user)
    await user.save({ validateBeforeSave: false});
    res.status(201).json({
        success: true,
        cartItems 
    })
})

// My Cart
// exports.myCart =  catchAsyncErrors( async(req,res,next)=>{
//     const user = await User.findById(req.user._id) 
//     const cartItems = user.cartItems ? user.cartItems : [];
//     let cartArray = [];
//     cartItems.forEach(async(item)=>{
//         console.log(item.product)
//         const product = await Product.findById(item.product);
//         console.log(product)
//         if(product){
//         let itemObj = {
//             product : item.product,
//             name: product.name,
//             price: product.price,
//             image: product.images[0].url,
//             stock: product.stock,
//             quantity : item.quantity
//         }
//         cartArray.push(itemObj)
//         }
//     })
//     console.log(cartArray)
    
//     res.status(200).json({
//         success: true,
//         cartItems: cartArray
//     })

// })
exports.myCart = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const cartItems = user.cartItems ? user.cartItems : [];
    let cartArray = [];

    // Use a for...of loop to handle asynchronous operations sequentially
    for (const item of cartItems) {
        const product = await Product.findById(item.product);
        if (product) {
            let itemObj = {
                product: item.product,
                name: product.name,
                price: product.price,
                image: product.images[0].url,
                stock: product.stock,
                quantity: item.quantity
            };
            cartArray.push(itemObj);
        }
    }

    res.status(200).json({
        success: true,
        cartItems: cartArray
    });
});



// Delete From Cart 
exports.deleteItemFromCart =  catchAsyncErrors( async(req,res,next)=>{
    const { product } = req.body;

    const user = await User.findById(req.user._id)
    console.log(`The value is: ${user.cartItems}`);
    //console.log(user.cartItems)
    const cartItems = user.cartItems.filter(item=> item.product.toString() !== product.toString())

    console.log(`The value is now: ${cartItems}`);
    //console.log(cartItems)
    await User.findByIdAndUpdate(req.user._id, {
        cartItems
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true
    })

})

// remove all items from cart
exports.removeCart = catchAsyncErrors(async(req,res,next)=>{
    
    const cartItems = [];
    await User.findByIdAndUpdate(req.user._id, {
        cartItems
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true,
        cartItems
    })

})
