const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captianController = require('../controllers/captian.controller');
//const captianModel = require('../models/captian.model');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'truck']).withMessage('Vehicle type must be car, bike, or truck')

], captianController.registerCaptian)

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
], captianController.loginCaptian);

router.get('/profile', authMiddleware.authCaptain, captianController.getCaptianProfile);
router.post('/logout', authMiddleware.authCaptain, captianController.logoutCaptian);

module.exports = router;