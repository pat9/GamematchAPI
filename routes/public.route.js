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


module.exports = router;