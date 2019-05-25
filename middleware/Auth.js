const jwt = require('jsonwebtoken');

const Auth = {
    IsLoggedIn: (req, res, next) =>{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                res.json(err);
            }
            else{
                req.AuthData = decoded;
                next();
            }
        });
    }
}

module.exports = Auth;