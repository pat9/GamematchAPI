const router = require('express').Router();
const Auth  = require('../middleware/Auth')
const users  = require('../models/user');
const jwt = require('jsonwebtoken');
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


router.use(Auth.IsLoggedIn)

router.get('/IsloggedIn', (req, res) =>{
    res.json({
        IsLoggedIn:true        
    })
});


router.put('/UpdateUser/:_id', upload.single('profilepic'), async (req, res) => {   
    const { email, gametag, password, name, birthday, description, facebookLink, twitterLink, twitchLink} = req.body;
    const editUser = { email, gametag, password, name, birthday, description, facebookLink, twitterLink, twitchLink};
    
    let profilepic = {};
    if (req.file != undefined){
        await cloudinary.uploader.upload(req.file.path,  { type: "private",  
        eager: [
            { width: 200, crop: "scale" }, 
        { width: 360, height: 200, 
          crop: "crop", gravity: "north"} ] }, (error, result) => {
              if(!error){
            profilepic = result;
            console.log(profilepic)
        }
        else{
            console.log(error)
            res.json({status:"Error in cloudinary"})
        }
    })
}

    const user = {_id:req.params._id, ...editUser, profilepic}
    const token = jwt.sign({user}, process.env.TOKEN_SECRET_KEY, { expiresIn: '90h' });
    await users.findByIdAndUpdate(req.params._id, editUser);
    res.json({status: 'Datos actualizados', token});    
});

router.put('/UpdateBannerUser/:_id', upload.single('bannerImg'), async (req, res) => {    
    let bannerImg = {};
    if (req.file != undefined){
        await cloudinary.uploader.upload(req.file.path,  { type: "private",  
        eager: [
            { width: 200, crop: "scale" }, 
        { width: 360, height: 200, 
          crop: "crop", gravity: "north"} ] }, (error, result) => {
            if(!error){
                bannerImg = result;
            console.log(bannerImg)
            }
        else{
            console.log(error)
            res.json({status:"Error in cloudinary"})
            }
        })
    }
    const user = {_id:req.params._id, profilepic}
    const token = jwt.sign({user}, process.env.TOKEN_SECRET_KEY, { expiresIn: '90h' });
    await users.findByIdAndUpdate(req.params._id, profilepic);
    res.json({status: 'Datos actualizados', token});    
});

router.delete('/DeleteUser/:_id', async(req, res)=>{
    await users.findByIdAndRemove(req.params._id);
    res.json({status: 'Usuario Eliminado'});
});

module.exports = router;