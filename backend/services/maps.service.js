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

module.exports.getDistanceAndTime = async (origin, destination) => {
    if(!origin || !destination) {
        throw new Error('Origin and Destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;
    try {
        const response = await axios.get(url, {
            params: {
                origins: origin,
                destinations: destination,
                key: apiKey
            }
        });

        const data = response.data;
        if (data.status !== 'OK') {
            throw new Error('Failed to fetch distance and time');
        }

        const element = data.rows[0].elements[0];
        if (element.status !== 'OK') {
            throw new Error('No distance or time found for the given locations');
        }

        return {
            distance: element.distance.text,
            duration: element.duration.text
        };
    } catch (error) {
        throw new Error('Failed to fetch distance and time: ' + error.message);
    }
}




