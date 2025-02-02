const express = require('express')
const route = express.Router()

const Details = require('../models/students')


route.post('/', async (req, res, next) => {

    try {

        data = req.body
        const NewStorage = new Details(data)
        const Savedata = await NewStorage.save()
        res.status(200).json(Savedata)

    } catch (error) {
        console.log('error Found ', error);
        res.status(500).json({ error: '<Error></Error>' })

    }
})
route.get('/', async (req, res) => {

    try {
        const getdata = await Details.find()
        res.status(200).json(getdata)
    } catch (error) {
        res.status(500).json({ error: '<Error></Error>' })
    }

})

route.get('/:place',async(req,res)=>{

    try{
        place = req.params.place;
        console.log(place);
        
        if(place == 'vapi Gujrat'|| place == 'colony'|| place == 'chanod'){

            const getPlace = await Details.find({adress:place})
            res.status(200).json(getPlace)
        }
        
    }catch{
        res.status(500).json({ error: '<Error></Error>' })

    }
})



route.put('/:id',async(req,res)=>{

    try{
        getid = req.params.id
        getDataForUpdate = req.body
        const response = await Details.findByIdAndUpdate(getid , getDataForUpdate,{
            res:true,
            runValidators:true
        })

        if(!response){
            res.status(404).json({error:'Error User not Found'})
        }

        res.status(200).json(response)

    }catch(error){
        res.status(500).json({ error: '<Error></Error>' })


    }
})
route.delete('/:id',async(req,res)=>{
    try{
        userdata = req.params.id
        const response  = await Details.findByIdAndDelete(userdata) 
        res.status(200).send('Delete Kar diya Chutiye ko')
    }catch(error){
        res.status(500).json(error)
    }

})



module.exports = route