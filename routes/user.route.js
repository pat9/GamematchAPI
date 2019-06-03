const router = require('express').Router();
const  Auth  = require('../middleware/Auth')
const users  = require('../models/user');
router.use(Auth.IsLoggedIn)

router.get('/IsloggedIn', (req, res) =>{
    res.json({
        IsLoggedIn:true        
    })

    // const id = req.AuthData;
    // console.log(id.user.name);
});


module.exports = router;