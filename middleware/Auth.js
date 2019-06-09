const jwt = require('jsonwebtoken');
const users = require('../models/user');

const Auth = {
    IsLoggedIn: (req, res, next) =>{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, async(err, decoded) => {
            if (err) {
                res.json(err);
            }
            else{
                const user = await users.find({_id:decoded.user._id})
                if(user){
                    req.AuthData = decoded;
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