const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    producer_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    image_link: {
        type: String,
        required: true
    }
    ,
    product_name: {
        type: String,
        required: true
    },
    available_till: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: "created_at"
    }
})


const Product = mongoose.model('Product', ProductSchema)
module.exports = Product 
