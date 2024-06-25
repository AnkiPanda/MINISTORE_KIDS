const app = require('./app')
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')
const Razorpay = require('razorpay')


// Handling Uncaught Exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to Uncaught Exceptions')
    process.exit(1)

})

const dotenv = require('dotenv')

dotenv.config({path:"config/config.env"})

connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

exports.razorpayInstance = razorpayInstance;

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejections
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to Unhandled Promise Rejections')
    server.close(()=>{
        process.exit(1)
    })
})

module.exports = server;