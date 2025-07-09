const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapsController = require('../controllers/maps.controller');
const {query } = require('express-validator');


router.get('/getCoordinates',
    query('adress').isString().isLength({min:3}),
    authMiddleware.authUser,mapsController.getCoordinates); 

    // router.get('/get-distance-time',
    // query('origin').isString().isLength({min:3}),   
    // query('destination').isString().isLength({min:3}),
    // authMiddleware.authUser,mapsController.getDistanceAndTime);


module.exports = router;