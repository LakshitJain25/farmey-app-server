const express = require('express')
const mongoose = require('mongoose')
const { GridFsStorage } = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const imageRouter = express.Router()
const multer = require('multer')
const crypto = require('crypto')
const path = require('path')
const bcrypt = require('bcryptjs')
const { createError } = require('../utils/error')
require('dotenv').config()

const conn = mongoose.createConnection(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
})

let gfs

conn.once('open', async () => {
    gfs = new mongoose.mongo.GridFSBucket((conn.db), {
        bucketName: 'images'
    })
})

const storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    file: (req, file) => {
        console.log(file, file.mimetype)
        const match = ['image/png', 'image/jpeg', 'image/jpg']
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`
            return filename
        }
        return {
            bucketName: "images",
            filename: `${Date.now()}-any-name-${file.originalname}`
        }
    }
})


const store = multer({ storage })

const uploadMiddleware = (req, res, next) => {
    const upload = store.single("image")
    upload(req, res, function (err) {
        if (err) console.log(err)
        next()
    })
}

imageRouter.post('/upload', uploadMiddleware, async (req, res, next) => {
    try {
        if (req.file === undefined) return res.status(401).send("you must select a file")
        return res.send(req.file.id)
    }
    catch (e) {
        console.log(e)
        next(createError(e))
    }
})


imageRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const _id = new mongoose.Types.ObjectId(id)
        conn.db.collection('images.files').findOne({ _id: _id }, (err, image) => {
            gfs.openDownloadStream(_id).pipe(res)
        })
        // console.log(conn.db.collection('images.files'))  
    }
    catch (e) {
        next(e)
    }

})

module.exports = { imageRouter }