const mapsService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ message: "Address is required" });
  }

  try {
    const coordinates = await mapsService.getAdressCoordinates(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// module.exports.getAddress = async (req, res,next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     const { lat, lng } = req.query;

//     if (!lat || !lng) {
//         return res.status(400).json({ message: 'Latitude and Longitude are required' });
//     }

//     try {
//         const address = await mapsService.getCoordinatesAddress(lat, lng);
//         return res.status(200).json(address);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// }

module.exports.getDistanceAndTime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res
      .status(400)
      .json({ message: "Origin and Destination are required" });
  }

  try {
    const distanceAndTime = await mapsService.getDistanceAndTime(
      origin,
      destination
    );
    return res.status(200).json(distanceAndTime);
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
