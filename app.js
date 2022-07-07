require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const petstoreRouter = require('./routes/pet')

app.use(bodyParser.json())
app.use('/pet', petstoreRouter)

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`)
})