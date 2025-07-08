const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapsController = require('../controllers/maps.controller');
const {query } = require('express-validator');


router.get('/getCoordinates',
    query('adress').isString().isLength({min:3}),
    authMiddleware.authUser,getCoordinates); 


module.exports = router;