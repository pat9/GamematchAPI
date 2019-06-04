const express = require ('express');
const router = express.Router();

const Ads = require('../models/ads');

router.get("/", async (req, res) =>{

    const { idVenue } = req.body;

    if(idVenue != undefined){
        const ads = await Ads.find({idVenue});
        res.json(ads);
    }

    const ads = await Ads.find();
    res.json(ads);
})


module.exports = router;