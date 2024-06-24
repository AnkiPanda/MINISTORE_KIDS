const User = require("../models/userModel")
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')
//require('../auth.ejs')

// exports.loadAuth = (req,res)=>{
//     res.render('auth')
// }
// Register a User
// exports.registerUser = catchAsyncErrors(async (req, res, next) => {
//     //console.log('Request received');
//     //console.log('Content Length:', req.headers['content-length']);
//     const { name, email, password } = req.body;
    

//     if (!email || !password || !name) {
//         return next(new ErrorHandler("Please enter Name, Email & Password", 400));
//     }

//     // Check if avatar is too large
//     if (req.body.avatar && Buffer.byteLength(req.body.avatar, 'base64') > 10 * 1024 * 1024) { // 10 MB
//         return next(new ErrorHandler("Avatar is too large. Maximum size is 10MB.", 400));
//     }

//     // Check if user already exists
//     let user = await User.findOne({ email }).select("+password");
//     if (user) {
//         return next(new ErrorHandler("User already exists", 400));
//     }
//     //console.log(avatar)

//     // Upload avatar to Cloudinary if provided
//     let myCloud;
//     console.log(req.body.avatar)
//     if(req.body.avatar){
//         console.log("hi")
//         myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//             folder: "avatars",
//             width: 150,
//             crop: "scale"
//         });
//     }
//     let userData = {
//         name,
//         email,
//         password
//     };

//     // Include avatar if uploaded
//     if (myCloud) {
//         userData.avatar = {
//             public_id: myCloud.public_id,
//             url: myCloud.secure_url
//         };
//     }
//     else{
//         userData.avatar = {
//             public_id: "",
//             url: ""
//         };
//     }
//     // Create new user
//     user = await User.create(userData);
    

//     sendToken(user, 201, res);
// });
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        return next(new ErrorHandler("Please enter Name, Email & Password", 400));
    }

    // Log the incoming request body for debugging
    //console.log('Request Body:', req.body);

    // Check if user already exists
    let user = await User.findOne({ email }).select("+password");
    if (user) {
        return next(new ErrorHandler("User already exists", 400));
    }

    // Create user data object
    let userData = {
        name,
        email,
        password,
        avatar: {
            public_id: "",
            url: ""
        }
    };
    // console.log("Avatar value:", req.body.avatar);
    // console.log("Type of avatar:", typeof req.body.avatar);
    // console.log("Is avatar defined and not empty:", req.body.avatar && req.body.avatar.trim() !== "");


    // If an avatar is provided, upload it to Cloudinary
    if (req.body.avatar && req.body.avatar.trim() !== "") {
        // Check if avatar is too large
        if (Buffer.byteLength(req.body.avatar, 'base64') > 10 * 1024 * 1024) { // 10 MB
            return next(new ErrorHandler("Avatar is too large. Maximum size is 10MB.", 400));
        }

        console.log("Uploading avatar to Cloudinary");
        try {
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale",
              });

            // Update userData with the uploaded avatar information
            userData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        } catch (error) {
            return next(new ErrorHandler("Avatar upload failed", 500));
        }
    }

    // Create new user
    user = await User.create(userData);

    sendToken(user, 201, res);
});


// Register a User
// exports.registerUserWithGoogle = catchAsyncErrors( async(req,res,next)=>{
    
//     console.log(req.user)
//     //const {name, email} = req.user;
//     // if(!email || !password || !name){
//     //     return next(new ErrorHandler("Please enter Name, Email & Password",400))
//     // }
//     // let user = await User.findOne({email})

//      if(!req.user){
//          return next(new ErrorHandler("Profile doesn't exist",400))
//      }

//     //  user = await User.create({
//     //     name,
//     //     email,
//     //     avatar: {
//     //         public_id: "this is my sample id",
//     //         url: "profilepicurl"
//     //     }
//     // })
//     // console.log(user)
//     sendToken(req.user,201,res)
    
//     // const token = user.getJWTToken();
//     // res.status(201).json({
//     //     success: true,
//     //     token
//     // })
// })

// Login User
exports.loginUser = catchAsyncErrors( async(req,res,next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter Email & Password",400))
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    //console.log(isPasswordMatched)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    sendToken(user,200,res)
    // const token = user.getJWTToken();
    // res.status(200).json({
    //     success: true,
    //     token
    // })

})

// Logout User
exports.logout = catchAsyncErrors( async(req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

// Forgot Password 
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandler("User not found",404))
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })
    console.log(resetToken)
    const resetPasswordUrl =  `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
   // const resetPasswordUrl =  `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not request this Email then, please ignore it.`
    console.log(message)
    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message
        })

        res.status(200).json({
            success: true,
            message:  `Email sent to ${user.email} successfully`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message,500))
        
    }
})


//Reset Password
exports.resetPassword = catchAsyncErrors( async(req,res,next)=>{

    // Creating token hash
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired.",404))
    }

    if(req.body.password != req.body.confirmPassword){
        return next(new ErrorHandler("Password does not matched.",404))
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false })

    sendToken(user,200,res)

})

// Get user Details
exports.getUserDetails = catchAsyncErrors( async(req,res,next)=>{
    
    const user = await User.findById(req.user._id)
    
    res.status(200).json({
        success: true,
        user
    })
})

// Update User Password
exports.updatePassword = catchAsyncErrors( async(req,res,next)=>{
    
    const user = await User.findById(req.user._id).select('+password')
    
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    //console.log(isPasswordMatched)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400)) 
    }

    user.password = req.body.newPassword;
    await user.save({ validateBeforeSave: false })
    
    sendToken(user,200,res)
   
})

// Update User Profile
exports.updateProfileData = catchAsyncErrors( async(req,res,next)=>{
   // console.log('Request received');
    let newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    //console.log(req.body)
    
    let user = await User.findById(req.user._id)

    
    if(req.body.avatar && req.body.avatar !== ""){
        
        if(user.avatar.public_id){
        const imgId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imgId)
        }
        if (Buffer.byteLength(req.body.avatar, 'base64') > 10 * 1024 * 1024) { // 10 MB
            return next(new ErrorHandler("Avatar is too large. Maximum size is 10MB.", 400));
        }
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });
        console.log(myCloud)
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.url
        }
    }

    console.log(newUserData)
     user = await User.findByIdAndUpdate(req.user._id, newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// Get All Users(admin)
exports.getAllUsers = catchAsyncErrors( async(req,res,next)=>{
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})

// Get Single User (admin)
exports.getSingleUser = catchAsyncErrors( async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not exists with id ${req.params.id}`,404))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update User (admin)
exports.updateUserRole = catchAsyncErrors( async(req,res,next)=>{
    
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    
    res.status(200).json({
        success: true,
        user
    })
})

// Delete User (admin)
exports.deleteUser = catchAsyncErrors( async(req,res,next)=>{

    const user = await User.findByIdAndDelete(req.params.id)

    // We will remove cloudinary later

    if(!user){
        return next(new ErrorHandler(`User does not exists with id ${req.params.id}`,404))
    }

   // await user.remove();

    res.status(200).json({
        success: true,
        user,
        message: "User deleted successfully"
    })
})

