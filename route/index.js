const route = require('express').Router();
const auth = require('../middleware/auth');
const userRoute = require('../route/userRoute');

route.use('/api/user', userRoute);
route.use(auth);


module.exports = route;