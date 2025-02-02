const mongoose = require('mongoose')
const CreateSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    no: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
})

const Details = mongoose.model('students', CreateSchema)

module.exports = Details