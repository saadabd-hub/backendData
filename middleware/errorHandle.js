module.exports = (err, req, res, next)=>{
    let stat;
    let error= err.name;
    let msg;

    switch(error){
        case 'INVALID TOKEN':
            stat = 401;
            msg = 'Invalid access token!';
        break;
        case 'MISSING_TOKEN':
            stat = 401;
            msg = 'Access token is missing!';
        break;
        case 'ALREADY_EXIST':
            stat = 409;
            msg = 'Username or password already exist';
        break;
        case 'LOGIN_FAILED':
            stat = 401;
            msg = 'Login Failed!';
        case 'INTERNAL_DATABASE_ERROR':
            stat = 500;
            msg = 'Internal Database is error!';
        break;
    }
    res.status(stat).json({
        success: false,
        msg
    });
}