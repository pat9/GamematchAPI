const jwt = require('jsonwebtoken');
const users = require('../models/user');

const Auth = {
    IsLoggedIn: (req, res, next) =>{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, async(err, decoded) => {
            if (err) {
                res.json(err);
            }
            else{
                const user = await users.findOne({_id:decoded.user._id})
                if(user){
                    req.AuthData = {...user._doc, token};
                    next();
                }
                else{
                    res.json({
                        err: 'UserNotLogged'
                    })
                }
                
            }
        });
    }
}

module.exports = Auth;