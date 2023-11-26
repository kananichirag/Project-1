const express = require('express');
const IndexRoutes = express.Router();
const AuthRoutes = require('../routes/AuthRoute')

IndexRoutes.use('/auth',AuthRoutes)

module.exports = IndexRoutes;