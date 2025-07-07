const { validationResult } = require('express-validator');
const captianModel = require('../models/captian.model');
const captianService = require('../services/captian.service');

module.exports.registerCaptian = async (req, res, next) => {

    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const{fullname,email,password,vehicle} = req.body;
    const existingCaptian = await captianModel.find({ email });
    if (existingCaptian) {
        return res.status(400).json({ message: 'Captian with this email already exists' });
    }
    const hashedPassword = await captianModel.hashPassword(password);
    const captian = await captianService.createCaptian({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    const token = captian.generateAuthToken();
    res.status(201).json({ token, captian });

}