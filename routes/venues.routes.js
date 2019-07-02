const express = require ('express');
const router = express.Router();
const Venues = require('../models/venues');
const path = require('path')
const SenderMail = require('../emailSender/emailSender')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
    destination:path.join(__dirname,'../temp/img'),
    filename:(req,file,callback) =>{
        callback(null, path.basename(file.originalname)+path.extname(file.originalname) )
    }
})

const upload = multer({storage})

//Get all the venues
router.get('/', async(req, res) => {
    const { lat, lng } = req.query;
    if(lat != undefined && lng != undefined){
        const venues = await Venues.aggregate([
            {
                "$geoNear": {
                    near : { type: "Point", coordinates: [parseFloat(lng),parseFloat(lat)] },
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

router.get('/invitation', async(req, res)=>{
    SenderMail("y2jmontalvo@gmail.com","GameMatch Venues", "venueInvitation",{name:"Venue Generica"});
    res.send("Enviado")
})

//Get a single venue
router.get('/:id', async (req, res) => {
    const venue = await Venues.findById(req.params.id);
    res.json(venue);
})

//Post a new venue
router.post('/', upload.single('profilepic'), async (req, res) => {
    let profilepic = {};
    await cloudinary.uploader.upload(req.file.path, (error, result) => {
        if(!error){
            profilepic = result;
        }
        else{
            console.log(error)
            res.json({status:"Error in cloudinary"})
        }
        
    })
    const {name, phone} = req.body;
    const loc = {type:"Point", coordinates: [req.body.coordinates.split(',')[1],req.body.coordinates.split(',')[0]]};
    const venue = new Venues({name, profilepic, loc, phone})
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