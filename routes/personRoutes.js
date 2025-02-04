const express = require('express')
const Roters = express.Router()

const Person = require('../models/person')


Roters.post('/', async (req, res, next) => {

    try {
        data = req.body
        const NewPerson = new Person(data)

        const response = await NewPerson.save()
        res.status(200).json(response)
        console.log("data saved Succesfully");
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal sarver error" })

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