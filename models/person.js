const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true

    }
})

personSchema.pre('save', async function(next) {
    const person = this;

    //Hash the password only if it has been modified or (new user )
    if (!person.isModified('password')) return next()
        
    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10)

        // Hash Passwod
        const Hasedpassword = await bcrypt.hash(person.password, salt)

        // Overwrite the plain password with hashed one
        person.password = Hasedpassword
        next()

    } catch (error) {
        return next(error)

    }
})

personSchema.methods.comparePassword = async function(candidatepassword) {
    try {
        const isMatch = await bcrypt.compare(candidatepassword, this.password)
        return isMatch
    } catch (error) {
        return error
    }
}

//Create Person model
const Person = mongoose.model('person', personSchema)

module.exports = Person