const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=`;

    try{
        const response = await axios.get(url);
        console.log("Google Maps API Response:", response.data); // 👈 Add this line

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to find the address');
        }
    }catch(error){
        console.error('Error fetching address coordinates:', error);
        throw new Error('Failed to fetch address coordinates');
    }
}


module.exports.getDistanceTime = async (origin, destination) =>{
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
                throw new Error('No route found between the origin and destination');
            }

            const element = response.data.rows[0].elements[0];

            return element;
        }
    } catch (error) {
        console.error('Error fetching distance and time:', error);
        throw new Error('Failed to fetch distance and time');
    }
}


module.exports.getSuggestions = async (input) => {
    if (!input) {
        throw new Error('Address is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions
        } else {
            throw new Error('Failed to fetch suggestions');
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        throw new Error('Failed to fetch suggestions');
    }

}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, ltd], radius / 6378.1] // Radius in radians
            }
        }
    });
    return captains
}