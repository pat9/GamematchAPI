const router = require('express').Router();
const jwt = require('jsonwebtoken')
const users  = require('../models/user');

router.post('/Login', async (req, res) =>{
    const {username, pass} = req.body;
    const user = await users.findOne({gametag:username, password:pass});
    if(user){
        const token = jwt.sign({user}, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
        res.json({
            isLogged:true,
            token
        })
    }
})

router.get('/Usuarios', async (req, res) =>{
    const usuarios = await users.find();
    res.json(usuarios);
});

router.post('/Register', async (req, res) =>{
    const { email, gametag, password, name, birthday} = req.body;
    const newUser = new users ({
        email, gametag, password, name, birthday
    });
    
    await newUser.save();
    console.log(newUser);   
    res.json('Usuario registrado');
});

router.put('/Update/:_id', async (req, res)=>{
    //5cf1664afbfdcc8aa45258f7
    const { email, gametag, password, name, birthday} = req.body;
    const editUser = { email, gametag, password, name, birthday};
    await users.findByIdAndUpdate(req.params._id, editUser);
    res.json({status: 'Datos actualizados'});
});

router.delete('/Delete/:_id', async(req, res)=>{
    await users.findByIdAndRemove(req.params._id);
    res.json({status: 'Usuario Eliminado'});
});

module.exports = router;