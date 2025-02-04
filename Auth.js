//get Authentication Through Passport
const LocalStrategy = require('passport-local').Strategy
const Person = require('./models/person')
const passport = require('passport');


//Adding Pasbook Authentication
passport.use(new LocalStrategy( async(USERNAME, password, done) => {
    try {

        //Username Functionality
        const user = await Person.findOne({ username: USERNAME })
        if (!user)
            return done(null, false, { massage: 'username is not defined ' })

        //Password Functionality
        const UsernameMatch = await user.comparePassword(password)
        if (UsernameMatch) {
            return done(null, user)
        } else {
            return done(null, false, { massage: ' your password is false' })
        }
    } catch (error) {

        return done(error)


    }
}))


module.exports = passport

