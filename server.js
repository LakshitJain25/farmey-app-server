const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { imageRouter } = require('./routes/imageRouter')
const { productRouter } = require('./routes/productRouter')
const cors = require('cors')
const app = express()
const port = process.env.port || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to disease app database")
}).catch((err) => console.log("ERROR", err))


app.get('/', (req, res) => {
    return res.send("hello")
})

app.use('/api/imageupload', imageRouter)
app.use('/api/product', productRouter)
app.use((err, req, res, next) => {
    console.log(err)
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    // console.log(errorStatus, errorMessage)
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        error: true,
        stack: err.stack
    })
})
app.listen(port, () => {
    console.log(`app is listening at ${port}`)
})