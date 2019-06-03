const express = require ('express');
const router = express.Router();

const Venues = require('../models/venues');

//Get all the venues
router.get('/', async(req, res) => {    
    const venues = await Venues.find();
    res.json(venues);    
})

//Get a single venue
router.get('/:id', async (req, res) => {
    const venue = await Venues.findById(req.params.id);
    res.json(venue);
})

//Post a new venue
router.post('/', async (req, res) => {
    const {name, profilepic, lat, long, phone} = req.body;
    const venue = new Venues({name, profilepic, lat, long, phone})
    await venue.save();
    res.json({status: 'venue Saved!'});
})

//Update an venue
router.put('/:id', async (req,res) => {
    const {name, profilepic, lat, long, phone} = req.body;
    const venue =  {name, profilepic, lat, long, phone};
    await Venues.findByIdAndUpdate(req.params.id, venue);
    res.json({status: 'venue Updated!'});
})

//Delete an venue
router.delete('/:id', async (req, res) =>{
    await Venues.findByIdAndRemove(req.params.id);
    res.json({status: 'venue Deleted!'})
})

module.exports = router;