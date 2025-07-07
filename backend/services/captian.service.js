const captianModel = require('../models/captian.model');


module.exports.createCaptian = async ({
    firstname,
    lastname,
    email,
    password,
    color,plate,capacity,
    vehicleType
}) => {
    if (!firstname || !email || !password || !color || !vehicleType || !plate || !capacity) {
        throw new Error('All fields are required');
    }
    
    const captian = await captianModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
       
    });
    
    return captian;
}