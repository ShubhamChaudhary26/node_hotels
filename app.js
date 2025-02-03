const express = require('express')
const app = express()
const db = require('./db')

// .env file Connecting
require('dotenv').config()


//Body parser for converting data which is come from frontend

const BodyParser = require('body-parser')
app.use(BodyParser.json()) // it willl store data in our req.body


app.get('/', (req, res, next) => {
    res.send('hello Shubham Chaudhary')
})


const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)


//This is for student file
const route = require('./routes/studentsRoutes')
app.use('/students', route)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Runnig 0n http://localhost:${3001}`);
})
