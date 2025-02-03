const mongoose = require("mongoose")
require('dotenv').config()

// Define the mongoDB connection 
// const mongoURl = DB_URL_LOCAL // We Can replace it With Other DB name eg:"hotel"
 const mongoURl = process.env.DB_URL

//Set Up Mongo Db Connection
mongoose.connect(mongoURl,{
    useNewUrlparser: true,
    useUnifiedTopology:true
})
//get the default connection

//Mongoose maintain a default connection objects  representing the mongodb connection
const db = mongoose.connection;


//Define Event Listener for database connection
db.on('connected',()=>{
    console.log(`connected to mongoDB Server`);
})

db.on('disconnected',()=>{
    console.log('Disconnected! ');
})
db.on('error',(error)=>{
    console.log("Error Found!",error);
})

//export the DB 
module.exports = db