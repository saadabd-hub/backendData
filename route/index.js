const route = require('express').Router();
const auth = require('../auth/auth');
const userRoute = require('../route/userRoute');
const error = require('../middleware/errorHandle');

route.use('/user', userRoute);
route.use(auth);

route.use(error);

module.exports = route;