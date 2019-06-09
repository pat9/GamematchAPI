const express = require ('express');
const router = express.Router();
const Versions = require('../models/versions');


//Get all the versiones
router.get('/', async(req, res) => {    
    const versions = await Versions.find();
    console.log(versions);
    res.json(versions);    
})

//Get a single version
router.get('/:id', async (req, res) => {
    const version = await Versions.findById(req.params.id);
    res.json(version);
})


//Post a new version
router.post('/create', async (req, res) => {
    const {version, devolopers, credits, contact} = req.body;
    const versions = new Versions({version, devolopers, credits, contact});
    await versions.save();
    res.json({status: 'Version Saved!'});
})


//Update an version
router.put('/update/:id', async (req,res) => {
    const {version, devolopers, credits, contact} = req.body;
    const newVersions = {version, devolopers, credits, contact};
    await Versions.findByIdAndUpdate(req.params.id, newVersions);
    res.json({status: 'Version Updated!'});
})


//Delete an arena
router.delete('/delete/:id', async (req, res) =>{
    await Versions.findByIdAndRemove(req.params.id);
    res.json({status: 'Version Deleted!'})
})




module.exports = router;