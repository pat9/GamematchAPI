const router = require('express').Router();
const  Auth  = require('../middleware/Auth')

router.use(Auth.IsLoggedIn)

router.get('/IsloggedIn', (req, res) =>{
    res.json({
        IsLoggedIn:true
    })
})

module.exports = router;    