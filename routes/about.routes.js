const express = require ('express');
const router = express.Router();
const About = require('../models/about');

router.post('/agregarAbout', async(req,res)=>{
    const {telefono, celular, facebook, instagram, twitch, descripcion} = req.body;
    const about = new About({telefono, celular, facebook, instagram, twitch, descripcion});
    await about.save();
    res.json({status : 'Se creo la información'});
})

router.get('/listaAbout', async(req, res)=>{
    const listAbout = await About.find();
    res.json(listAbout);
})

router.get('/infoAbout/:id', async(req, res)=>{
    const about = await About.findById(req.params.id);
    res.json(about)
})

router.delete('/eliminarAbout/:id', async(req, res)=>{
    await About.findByIdAndDelete(req.params.id);
    res.json({status : "Eliminado"})
})

router.put('/editarAbout/:id', async(req,res)=>{
    const {telefono, celular, facebook, instagram, twitch, descripcion} = req.body;
    const datosabout = {telefono, celular, facebook, instagram, twitch, descripcion};
    await About.findByIdAndUpdate(req.params.id, datosabout);
    res.json({status:'Editado'});
})


module.exports = router;