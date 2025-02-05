const express = require('express')
const Roters = express.Router()
//JWT Token
const { jwtAuthMiddleware, generatToken } = require('../jwt')
const Person = require('../models/person')


Roters.post('/signup', async (req, res, next) => {

    try {
        data = req.body
        const NewPerson = new Person(data)

        const response = await NewPerson.save()
        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));

        const token = generatToken(payload)

        console.log('Token is ', token);

        res.status(200).json({ response: response, token: token })
        console.log("data saved Succesfully");
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal sarver error" })

    }
})

//Login Route

Roters.post('/login', async (req, res, next) => {
    try {
        //Extract Username and password from request body
        const { username, password } = req.body;

        //Find the User by Username
        const user = await Person.findOne({ username: username })

        //If the User does not exits or password Does not match , return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'username and password not match' })
        }
        //generate token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generatToken(payload)

        //return token as response
        res.json({ token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server errror JWT' })
    }

})

//Get Method to get a perosn
Roters.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        res.status(200).json(data)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal error' })
    }
})

// Get Profile 
Roters.get('/profile', jwtAuthMiddleware, async (req, res, next) => {
    try {
        const userData = req.user
        console.log("UserData :", userData);
        const userid = userData.id
        const userfind = await Person.findById(userid)

        res.status(200).json({ userfind })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal error' })

    }
})


Roters.get('/:workType', async (req, res) => {

    try {
        const workType = req.params.workType // Extract the work type from the URL parameters 
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await Person.find({ work: workType })
            console.log(response);
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal error' })
    }

})


Roters.put('/:id', async (req, res) => {
    try {
        getid = req.params.id
        getbody = req.body
        const response = await Person.findByIdAndUpdate(getid, getbody, {
            res: true,
            runValidators: true
        })

        if (!response) {
            res.status(404).json({ error: 'person not found' })

        }
        res.status(200).json(response)


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'person not found' })

    }

})

Roters.delete('/:id', async (req, res) => {
    try {
        const getdata = req.params.id
        const response = await Person.findByIdAndDelete(getdata)

        if (!response) {
            res.status(404).json({ error: 'person not found' })
        }

        res.status(200).json({ massage: 'Succefully deleted' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'person not found' })

    }
})







module.exports = Roters;