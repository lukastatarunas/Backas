const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

const config = require('./config.js')
const mongoose = require('mongoose')
require('./worker.routes.js')(app)

mongoose.Promise = global.Promise

mongoose.connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database")    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
})

app.get('/', (req, res) => {
    res.json({"message": "API is working!"})
})

app.listen(config.serverport, () => {
    console.log("Server is listening on port 5000")
})