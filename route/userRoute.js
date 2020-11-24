const route = require('express').Router();
const userControl = require('../controller/userController');
const {check, validation} = require('express-validator');

route.post('/register', userControl.register);
route.post('/login', userControl.login);

module.exports = route;