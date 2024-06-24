const Payment = require('../models/paymentModel')
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const razorpayInstance = require("../server.js")
const crypto = require('crypto')

exports.paymentProcess = catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body.amount)
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
        receipt: Date.now
      };
      //console.log("razorpayInstance:",razorpayInstance)
     // console.log("razorpayInstance key:",razorpayInstance.razorpayInstance.orders)
     // console.log("Creating order with options:", options);
      const order = await razorpayInstance.razorpayInstance.orders.create(options);
      console.log(order)
      res.status(200).json({
        success: true,
        order
      });
})

exports.paymentVerification = catchAsyncErrors(async(req,res,next)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log(body)
    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if(isAuthentic){
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });
        res.redirect(
            `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
        );
        // res.status(200).json({
        //     success: true,
        // });
    }
    else{
        res.status(400).json({
            success: false,
        });
    }

})

exports.sendRazorpayApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});