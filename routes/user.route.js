const router = require('express').Router();
const  Auth  = require('../middleware/Auth')
const users  = require('../models/user');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

router.use(Auth.IsLoggedIn)

router.get('/IsloggedIn', (req, res) =>{
    res.json({
        IsLoggedIn:true        
    })
});


router.put('/UpdateUser/:_id', async (req, res)=>{   
    const { email, gametag, password, name, birthday, description, facebookLink, twitterLink, twitchLink} = req.body;
    const editUser = { email, gametag, password, name, birthday, description, facebookLink, twitterLink, twitchLink};
    const user = {_id:req.params._id, ...editUser}
    const token = jwt.sign({user}, process.env.TOKEN_SECRET_KEY, { expiresIn: '90h' });

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
    await users.findByIdAndUpdate(req.params._id, editUser);
    res.json({status: 'Datos actualizados', token});
});

router.delete('/DeleteUser/:_id', async(req, res)=>{
    await users.findByIdAndRemove(req.params._id);
    res.json({status: 'Usuario Eliminado'});
});

module.exports = router;