const express = require('express')
const app = express()
const db = require('./db')

// .env file Connecting
require('dotenv').config()

// Importing Authentication File
const passport = require('./Auth')

//Body parser for converting data which is come from frontend
const BodyParser = require('body-parser')
app.use(BodyParser.json()) // it willl store data in our req.body




//adding middleware Function
// const MiddleWare = (req,res,next)=>{
//     console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`  );
//     next()
// }
// app.use(MiddleWare)


app.use(passport.initialize())
const LocalAuthMiddleware = passport.authenticate('local', { session: false })

app.get('/', (req, res, next) => {
    res.send('hello Shubham Chaudhary')
})

// this is for person file
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)


//This is for student file
const route = require('./routes/studentsRoutes')
app.use('/students', route)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Runnig 0n http://localhost:${PORT}`);
})
