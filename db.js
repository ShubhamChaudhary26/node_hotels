const mongoose = require("mongoose")

// Define the mongoDB connection 
const mongoURl = "mongodb://127.0.0.1:27017/hotels" // We Can replace it With Other DB name eg:"hotel"

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