const express = require ('express');
const router = express.Router();
const Versions = require('../models/versions');


//Get all the versiones
router.get('/versions', async(req, res) => {    
    const versions = await Versions.find();
    console.log(versions);
    res.json(versions);    
})

//Get a single version
router.get('/developers/:_id', async (req, res) => {
    const version = await Versions.findById(req.params._id);
    res.json(version);
})


//Post a new version
router.post('/createversions', async (req, res) => {
    const { version, developers, description,position} = req.body;
    const versions = new Versions({developers,description,position,version});
    await versions.save();
    res.json({status: 'Usuario Creado'});
})


//Update an version
router.put('/updateversion/:id', async (req,res) => {
    const {version, developers, description,position} = req.body;
    const newVersions = {version, developers, description,position};
    await Versions.findByIdAndUpdate(req.params.id, newVersions);
    res.json({status: 'Version Updated!'});
})


//Delete an arena
router.delete('/deleteversion/:id', async (req, res) =>{
    await Versions.findByIdAndRemove(req.params.id);
    res.json({status: 'Version Deleted!'})
})




module.exports = router;