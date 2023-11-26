const express = require('express');
const AuthRoute = express.Router();
const AuthControoler = require('../controller/AuthController')

AuthRoute.post('/signup',AuthControoler.SignUp);
AuthRoute.post('/signin',AuthControoler.SignIn);

module.exports = AuthRoute;