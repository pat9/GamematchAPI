const router = require('express').Router();
const  Auth  = require('../middleware/Auth')
const users  = require('../models/user');
router.use(Auth.IsLoggedIn)

router.get('/IsloggedIn', (req, res) =>{
    res.json({
        IsLoggedIn:true        
    })
});


router.put('/UpdateUser/:_id', async (req, res)=>{    
    const { email, gametag, password, name, birthday} = req.body;
    const editUser = { email, gametag, password, name, birthday};
    await users.findByIdAndUpdate(req.params._id, editUser);
    res.json({status: 'Datos actualizados'});
});

router.delete('/DeleteUser/:_id', async(req, res)=>{
    await users.findByIdAndRemove(req.params._id);
    res.json({status: 'Usuario Eliminado'});
});

module.exports = router;