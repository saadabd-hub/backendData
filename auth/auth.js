const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    const {access_token} = req.headers;
    if(access_token){
        jwt.verify(access_token, 'CLIENT',
        (err, decoded)=>{
            if(err) next({error: 'INVALID_TOKEN'});
            else{
                req._userID = decoded._id;
                next();
            }
        });
    } else next();
}
