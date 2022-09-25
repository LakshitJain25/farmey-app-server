const mongoose = require('mongoose')

const CargoSchema = new mongoose.Schema({
    transporter_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    }
    ,
    available_space: {
        type: String,
        required: true
    },
    expiry_date: {
        type: Date,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },

}, {
    timestamps: {
        createdAt: "created_at"
    }
})


const Cargo = mongoose.model('Cargo', CargoSchema)
module.exports = Cargo 
