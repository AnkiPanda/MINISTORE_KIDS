const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
   
    cartItems: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true},
            price: { type: Number, required: true},
            image: { type: String, required: true },
            stock: { type: Number, required: true},
            product: { type: mongoose.Schema.ObjectId, ref: "Product" , required: true },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Cart",cartSchema)