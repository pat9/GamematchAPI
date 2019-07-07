const router = require('express').Router();
const jwt = require('jsonwebtoken')
const users  = require('../models/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path')
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
    destination:path.join(__dirname,'../temp/img'),
    filename:(req,file,callback) =>{
        callback(null, path.basename(file.originalname))
    }
})

const upload = multer({storage})

router.post('/Login', async (req, res) =>{
    const {email, pass} = req.body;
    const passEncryp = crypto.createHmac('sha1', 'secreto').update(pass).digest('hex');        
    const user = await users.findOne({email, password:passEncryp});
    if(user){
        if(user.password === passEncryp){
            const token = jwt.sign({user}, process.env.TOKEN_SECRET_KEY, { expiresIn: '90h' });
            res.json({
                isLogged:true,
                token            
            })
        }
    }else{
        
    }
})

router.get('/Usuarios', async (req, res) =>{
     const usuarios = await users.find();
      res.json(usuarios);
});

router.get('/Usuario/:_id', async(req, res) =>{
    const usuario = await users.findById(req.params._id);    
     res.json(usuario);     
})

router.post('/Register', upload.single('profilepic'), async (req, res) =>{
    const { email, gametag, password, name, birthday, correo} = req.body;
    
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
    
    const dateUser = new Date(birthday);
    const dateNow = new Date();

    const oldUser = Math.floor(((dateNow - dateUser) / (1000 * 60 * 60 * 24)/ 365));
    
    const passEncryp = crypto.createHmac('sha1', 'secreto').update(password).digest('hex');        
    const newUser = new users({
        email : email, gametag : gametag, password : passEncryp, name : name , birthday : birthday, profilepic
    });

    if(oldUser < 13){
        var transporter = nodemailer.createTransport ({ 
            service: 'gmail', 
            auth: { 
                user: process.env.GAMEGMAIL, 
                    pass: process.env.GAMEPASS 
                } 
            });
        
            const mailOptions = { 
            from: process.env.GAMEGMAIL,
            to: correo, // lista de los destinatarios del 
            subject: 'Control Parental', // Línea del asunto 
            html: '<h1> GameMatch <h1> <br> <p> Por este medio le comunico que su hij@ ha creado una cuenta en nuestra plataforma, este mensaje tiene como finalidad informarle acerca de la actividad de su hij@ </p>' // cuerpo de texto sin formato 
        };
        
        transporter.sendMail (mailOptions, function (err, info) { 
            if (err){
                console.log (err) 
            }              
         });   
    }


    const user = await newUser.save();
    const token = await GenerateToken(user);
    res.json({
        isLogged:true,
        token            
    })
});

router.post('/FacebookLogin', async(req, resp)=>{
    const {email, name, picture, userID, isSocialLogin, socialMethod} = req.body;
    const userExits = await users.findOne({idSocial:userID});

    if(userExits){
        const token = jwt.sign({user:userExits}, process.env.TOKEN_SECRET_KEY, { expiresIn: '90h' });
        resp.json({msg:'USER_EXIST', token:token})
    }else{
        const newUser = new users({email, name, profilepic:picture.data, isSocialLogin,socialMethod, idSocial:userID})
        await newUser.save();
        const token = jwt.sign({user:newUser}, process.env.TOKEN_SECRET_KEY, { expiresIn: '90h' });
        resp.json({msg:'USER_EXIST', token:token})

    }
    


})

//Helpers
const GenerateToken = (user) =>{
    return jwt.sign({user}, process.env.TOKEN_SECRET_KEY, { expiresIn: '90h' });
}

const UploadPicture = (filename) =>{
    cloudinary.uploader.upload(filename, (error, result) => {
        if(!error){
            return result;
        }
        else{
            console.log(error)
            return { err:"No se pudo subir" }
        }
        
    })
} 

module.exports = router;