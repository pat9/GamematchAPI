const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const cloudinary = require('cloudinary').v2;
const Ads = require('../models/ads');


const storage = multer.diskStorage({
    destination:path.join(__dirname,'../temp/img'),
    filename:(req,file,callback) =>{
        callback(null, path.basename(file.originalname))
    }
})

const upload = multer({storage})

router.get("/:id", async (req, res) =>{

    const { idVenue } = req.params;

    if(idVenue != undefined){
        const ads = await Ads.find({idVenue});
        res.json(ads);
    }

    const ads = await Ads.find();
    console.log(ads)
    res.json(ads);
})

router.post('/create', upload.single('flyer'),async (req, res) =>{
    console.log(req.body)
    const { idVenue, titulo} = req.body;
    let profilepic = {};
    await cloudinary.uploader.upload(req.file.path, (error, result) => {
        if(!error){
            profilepic = result;
            console.log(profilepic)
        }
        else{
            console.log(error)
            res.json({status:"Error in cloudinary"})
        }
    })
    const ad = new Ads({ idVenue, titulo, imagen:profilepic});
    await ad.save();
    res.json("Listo")
})


module.exports = router;