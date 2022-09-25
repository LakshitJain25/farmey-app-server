const express = require('express')
const bcrypt = require('bcryptjs')
const cargoRouter = express.Router()
const Cargo = require('../models/cargoModel')
const { createError } = require('../utils/error');
const { default: mongoose, mongo } = require('mongoose');



cargoRouter.get('/fetch', async (req, res, next) => {
    try {
        const cargos = await Cargo.find()
        // console.log(cargos)
        res.send(cargos)
    }
    catch (e) {
        console.log(e)
        next(e)
    }

})


cargoRouter.get('/fetch/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const _id = mongoose.Types.ObjectId(id)
        const cargo = await Cargo.findById(_id)
        // console.log(cargo)
        res.send(cargo)
    }
    catch (e) {
        console.log(e)
        next(e)
    }

})

cargoRouter.post('/upload', async (req, res, next) => {
    console.log(req.body)
    try {
        const cargo = new Cargo({
            ...req.body
        })
        await cargo.save()
        res.send(cargo)
    }
    catch (e) {
        console.log(e)
        next(e)
    }

})

module.exports = { cargoRouter }