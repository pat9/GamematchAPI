const express = require ('express');
const router = express.Router();
const Contacto = require('../models/contacto');

router.post('/addcontact', async(req, res)=>{
    const {email, telefono, link, direccion} = req.body;
    const contacto = new Contacto({email, telefono, link, direccion});
    await contacto.save();
    res.json({status : "Contacto Guardado"});
})

router.put('/editcontacto/:id', async(req, res)=>{
    const {email, telefono, link, direccion} = req.body;
    const contacto = {email, telefono, link, direccion};
    await Contacto.findByIdAndUpdate(req.params.id, contacto);
    res.json({status : "Contacto Editado"});
})

router.get('/infocontacto', async(req, res)=>{
    const dataContacto = await Contacto.find();
    res.json(dataContacto);
})

router.delete('/deletecontacto/:id', async(req, res)=>{
    await Contacto.findByIdAndDelete(req.params.id);
    res.json({status : "Contacto Borrado"});
})

router.get('/datoscontacto/:id', async(req, res)=>{
    const contacto = await Contacto.findById(req.params.id);
    res.json(contacto);
})




module.exports = router;