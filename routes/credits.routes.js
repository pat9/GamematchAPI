const express = require ('express');
const router = express.Router();
const Credits = require('../models/credits');


//Get all the credits
router.get('/credits', async(req, res) => {    
    const credits = await Credits.find();
    console.log(credits);
    res.json(credits);    
})

//Get a single credits
router.get('/type/:_id', async (req, res) => {
    const credit = await Credits.findById(req.params._id);
    res.json(credit);
})


//Post a new credits
router.post('/createcredits', async (req, res) => {    
    const { type, name, url} = req.body;
    const credits = new Credits({type,name,url});
    await credits.save();
    res.json({status: 'credits Creado'});
})


//Update an credits
router.put('/updatecredits/:id', async (req,res) => {
    const {type, name, url} = req.body;
    const newCredits = {type, name, url};
    await Credits.findByIdAndUpdate(req.params.id, newCredits);
    res.json({status: 'credits Updated!'});
})


//Delete an credits
router.delete('/deletecredits/:id', async (req, res) =>{
    await Credits.findByIdAndRemove(req.params.id);
    res.json({status: 'credits Deleted!'})
})




module.exports = router;