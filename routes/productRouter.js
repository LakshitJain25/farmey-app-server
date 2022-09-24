const express = require('express')
const bcrypt = require('bcryptjs')
const productRouter = express.Router()
const Product = require('../models/productModel')
const { createError } = require('./../utils/error');
const { default: mongoose, mongo } = require('mongoose');



productRouter.get('/fetch', async (req, res, next) => {
    try {
        const products = await Product.find()
        // console.log(products)
        res.send(products)
    }
    catch (e) {
        console.log(e)
        next(e)
    }

})


productRouter.get('/fetch/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const _id = mongoose.Types.ObjectId(id)
        const product = await Product.findById(_id)
        // console.log(product)
        res.send(product)
    }
    catch (e) {
        console.log(e)
        next(e)
    }

})

productRouter.post('/upload', async (req, res, next) => {
    console.log(req.body)
    try {
        const product = new Product({
            ...req.body
        })
        console.log(product)
        await product.save()
        res.send(product)
    }
    catch (e) {
        console.log(e)
        next(e)
    }

})

module.exports = { productRouter }