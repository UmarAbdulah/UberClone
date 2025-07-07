const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');




module.exports.getCoordiantes = async (req,res,next) =>{
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {address} = req.query;
    if (!address) {
        return res.status(400).json({ message: 'Address is required' });
    }

    try {
        const coordinates = await mapsService.getAddressCoordinate(address);
        return res.status(200).json(coordinates);
    }
    catch (error) {
        console.error('Error fetching coordinates:', error);
        return res.status(404).json({ message: 'Failed to fetch coordinates' });
    }

}

module.exports.getDistanceAndTime = async (req,res,next) =>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {origin , destination} = req.query;


        const distanceTime = await mapsService.getDistanceTime(origin, destination);

        res.status(200).json(distanceTime)
    }
    catch(error){
        console.error('Error fetching distance and time:', error);
        return res.status(404).json({ message: 'Failed to fetch distance and time' });

    }
}

module.exports.getSuggestions = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log("'")
        console.log(req.query)
        const { input } = req.query;
        const suggestions = await mapsService.getSuggestions(input);
        return res.status(200).json(suggestions);
    }
    catch(error){
        console.error('Error fetching suggestions:', error);
        return res.status(404).json({ message: 'Failed to fetch suggestions' });
    }
}