const express = require ('express');
const router = express.Router();

const Venues = require('../models/venues');

//Get all the venues
router.get('/', async(req, res) => {
    const { lat, lng } = req.body;
    if(lat != undefined && lng != undefined){
        const venues = await Venues.aggregate([
            {
                "$geoNear": {
                    near : { type: "Point", coordinates: [lng,lat] },
                    distanceField: "dist.calculated",
                    maxDistance: 500000, 
                    includeLocs:"dist.location", 
                    num: 10, spherical :true 
                }
            }
        ]);
        res.json(venues);        
    }else{
        const venues = await Venues.find();
        res.json(venues);
    }
})

//Get a single venue
router.get('/:id', async (req, res) => {
    const venue = await Venues.findById(req.params.id);
    res.json(venue);
})

//Post a new venue
router.post('/', async (req, res) => {
    console.log(req.body)
    const {name, profilepic, phone} = req.body;
    const {type,coordinates} = req.body.loc;
    const venue = new Venues({name, profilepic, loc:{type, coordinates}, phone})
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