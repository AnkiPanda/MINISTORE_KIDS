const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
//const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
//const session = require("express-session")
// const passport = require('passport');
// require('./passportConfig'); // Adjust the path as necessary
const path = require('path');
const cors = require('cors')

const errorMiddleware = require("./middleware/error")

// // Middleware to log requests
// app.use((req, res, next) => {
//     console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
//     console.log(`Content-Length: ${req.headers['content-length']}`);
//     next();
// });

//app.use(express.json())
app.use(cookieParser())
// Increase the limit for JSON payloads
app.use(express.json({ limit: '10mb' }));

// Increase the limit for URL-encoded payloads
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}));


  

const dotenv = require('dotenv')

dotenv.config({path:"backend/config/config.env"})

// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: process.env.SESSION_SECRET,
//     cookie: { secure: false }
// }))

// app.use(passport.initialize());
// app.use(passport.session());

// app.set('view engine', 'ejs')

//app.set('views', path.join("/Applications/Projects/mern-stack/views", 'auth'));


// Route Imports
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")
const shippingInfo = require("./routes/shippingInfoRoute")
const payment = require("./routes/paymentRoute")
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",shippingInfo)
app.use("/api/v1",payment)

app.use(cors());

app.use(express.static(path.join(__dirname, "../frontend/dist-new")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist-new/index.html"));
});


// Middleware for Errors
app.use(errorMiddleware)



module.exports = app;