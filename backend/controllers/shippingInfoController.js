const User = require("../models/userModel")
const ShippingInfo = require("../models/shippingInfoModel")
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



exports.createShippingInfo = catchAsyncErrors(async (req,res,next)=>{
    req.body.user = req.user.id;
    const shippingInfo = await ShippingInfo.create(req.body);
    res.status(201).json({
        success:true,
        shippingInfo
    })
})

exports.getShippingInfo = catchAsyncErrors(async (req,res,next)=>{

    const shippingInfo = await ShippingInfo.find({"user":req.user._id})

    if(!shippingInfo){
        return next(new ErrorHandler("Shipping Information not Found",404))
    }
    
    res.status(200).json({
        success:true,
        shippingInfo
    })

})

exports.deleteShippingInfo = catchAsyncErrors(async (req,res,next)=>{
    console.log(req.params.id)
    let shippingInfo = await ShippingInfo.findById(req.params.id)
    console.log(shippingInfo)
    if(!shippingInfo){
        return next(new ErrorHandler("Shipping Information not Found",404))
    }
    shippingInfo = await ShippingInfo.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "One Shipping Details Deleted Successfully",
        shippingInfo
    })
})

exports.editShippingInfo = catchAsyncErrors(async (req,res,next)=>{
    console.log(req.params.id)
    let shippingInfo = await ShippingInfo.findById(req.params.id)
    console.log(shippingInfo)
    if(!shippingInfo){
        return next(new ErrorHandler("Shipping Information not Found",404))
    }
    shippingInfo = await ShippingInfo.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true,
        message: "One Shipping Details Updated Successfully",
        shippingInfo
    })
})