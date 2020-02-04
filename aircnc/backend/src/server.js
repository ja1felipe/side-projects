const express = require('express')
const app = express()
const routes = require('./router')
const mongoURL = 'mongodb+srv://felipe:felipe123@cluster0-cpcka.mongodb.net/aircnc?retryWrites=true&w=majority'
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'thumbnails')))
mongoose.connect(mongoURL, { useNewUrlParser : true, useUnifiedTopology : true }, (err) => {
    if(err) console.log('Database connection error')
    console.log('Database connected')
})

app.use(routes)

app.listen(2000, () => {
    console.log('Server ouvindo na porta 2000')
})
