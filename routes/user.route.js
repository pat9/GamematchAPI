const router = require('express').Router();
const  Auth  = require('../middleware/Auth')
const users  = require('../models/user');
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
router.use(Auth.IsLoggedIn)

router.get('/IsloggedIn', (req, res) =>{
    res.json({
        IsLoggedIn:true        
    })
});


router.put('/UpdateUser/:_id', async (req, res)=>{    
    const { email, gametag, password, name, birthday} = req.body;
    const passEncryp = crypto.createHmac('sha1', gametag).update(password).digest('hex');        
    const editUser = { email : email, gametag: gametag, password : passEncryp, name : name, birthday : birthday};
    const token = jwt.sign({editUser}, process.env.TOKEN_SECRET_KEY, { expiresIn: '90h' });
    await users.findByIdAndUpdate(req.params._id, editUser);
    res.json({token});
});

router.delete('/DeleteUser/:_id', async(req, res)=>{
    await users.findByIdAndRemove(req.params._id);
    res.json({status: 'Usuario Eliminado'});
});

module.exports = router;