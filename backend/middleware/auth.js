const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken')
const User = require("../models/userModel")


exports.isAuthenticatedUser = catchAsyncErrors( async(req,res,next)=>{
        
        console.log(req.cookies)
        const { token } = req.cookies;
        console.log(token)

        if(!token){
            return next(new ErrorHandler("Please Login to access this resource", 401))
        }

        const decodedData = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decodedData.id)

        next()
         
})

exports.authorizaRoles = (...roles)=>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
          return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));
        }

        next();
    }
}