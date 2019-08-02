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

router.post('/create', async (req, res) =>{
    console.log(req.body)
    const { idVenue, titulo, descripcion, isCupon, numCupones } = req.body;
    const ad = new Ads({ idVenue, titulo, descripcion, isCupon, numCupones});
    await ad.save();
    res.json("Listo")
})


module.exports = router;