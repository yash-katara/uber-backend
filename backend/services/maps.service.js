const axios = require('axios');

module.exports.getAdressCoordinates = async (address) => {
    if (!address) {
        throw new Error('Address is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        throw new Error('Google Maps API key is not set in environment variables');
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json`;
    const params = {
        address,
        key: apiKey
    };

    try {
        const response = await axios.get(url, { params });
        const results = response.data.results;

        if (!results || results.length === 0) {
            throw new Error('No coordinates found for the given address');
        }

        const location = results[0].geometry.location;
        return {
            ltd: location.lat,
            langs: location.lng
        };
    } catch (error) {
        throw new Error('Failed to fetch coordinates: ' + error.message);
    }
}