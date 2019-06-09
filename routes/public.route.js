const router = require('express').Router();
const jwt = require('jsonwebtoken')
const users  = require('../models/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

router.post('/Login', async (req, res) =>{
    const {username, pass} = req.body;
    const passEncryp = crypto.createHmac('sha1', username).update(pass).digest('hex');        
    const user = await users.findOne({gametag:username, password:passEncryp});
    if(user){
        if(user.password === passEncryp){
            const token = jwt.sign({user}, process.env.TOKEN_SECRET_KEY, { expiresIn: '90h' });
            res.json({
                isLogged:true,
                token            
            })
        }
    }
})

router.get('/Usuarios', async (req, res) =>{
     const usuarios = await users.find();
      res.json(usuarios);
});

router.get('/Usuario/:_id', async(req, res) =>{
    const usuario = await users.findById(req.params._id);    
     res.json(usuario);
     console.log("Usuario encontrado");
})

router.post('/Register', async (req, res) =>{
    
    const { email, gametag, password, name, birthday, correo} = req.body;
    const dateUser = new Date(birthday);
    const dateNow = new Date();    
    month = dateNow.getMonth();
    day = dateNow.getDay();
    year = dateNow.getFullYear();

    dateNow.setDate(day);
    dateNow.setMonth(month);
    dateNow.setFullYear(year);

    const oldUser = Math.floor(((dateNow - dateUser) / (1000 * 60 * 60 * 24)/ 365));

    console.log(oldUser);

    if(oldUser >= 18){        
        const passEncryp = crypto.createHmac('sha1', gametag).update(password).digest('hex');        
        const newUser = new users({
            email : email, gametag : gametag, password : passEncryp, name : name , birthday : birthday
        });
        await newUser.save();
        res.json('Usuario registrado');
    }else{
        const passEncryp = crypto.createHmac('sha1', gametag).update(password).digest('hex');        
        const newUser = new users({
            email : email, gametag : gametag, password : passEncryp, name : name , birthday : birthday, correo:correo
        });                
        var transporter = nodemailer.createTransport ({ 
            service: 'gmail', 
            auth: { 
                    user: process.env.GAMEGMAIL, 
                    pass: process.env.GAMEPASS 
                } 
            });
        
        const mailOptions = { 
            from: process.env.GAMEGMAIL, // dirección del remitente 
            to: correo, // lista de los destinatarios del 
            subject: 'Control Parental', // Línea del asunto 
            html: '<h1> GameMatch <h1> <br> <p> Por este medio le comunico que su hij@ ha creado una cuenta en nuestra plataforma, este mensaje tiene como finalidad informarle acerca de la actividad de su hij@ </p>' // cuerpo de texto sin formato 
        };

        transporter.sendMail (mailOptions, function (err, info) { 
            if (err){
              console.log ('Hubo un error') } 
            else {
              console.log ('El correo ha sido enviado y el usuario se ha creado'); 
            }
         });
        await newUser.save();
        
    }
});

module.exports = router;