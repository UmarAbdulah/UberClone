const { getCaptainsInTheRadius } = require('../services/maps.service');
const rideService = require('../services/ride.service');
const  {validationResult} = require('express-validator');
const mapsService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
const captainModel = require('../models/captain.model');

module.exports.createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pickup, destination, vehicleType } = req.body;

        const ride = await rideService.createRide({
            user: req.user._id,
            pickup: pickup,
            destination,
            vechicleType: vehicleType
        });
        const pickupCoordinates =  await mapsService.getAddressCoordinate(pickup);
        console.log(pickupCoordinates)

        const captainsInRadius = await mapsService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 10);

        console.log(captainsInRadius);

        ride.otp = "";

        const rideWithUser = await rideModel.findOne({_id : ride._id}).populate('user');
        
        console.log("-------------------------------'")
        console.log(rideWithUser)
        console.log(captainsInRadius)
        console.log("-------------------------------'")

        captainsInRadius.map(
            captain =>{
                sendMessageToSocketId(captain.socketId,{
                    event : 'new-ride',
                    data : rideWithUser
                })
            }
        )
        
        return res.status(201).json({
            success: true,
            message: "Ride Created Successfully",
            ride
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

module.exports.getFare = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pickup, destination } = req.query;

        const fare = await rideService.getFare(pickup, destination);

        return res.status(200).json({
            success: true,
            message: "Fare fetched successfully",
            fare
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports.confirmRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId,captainId} = req.body;


        const captain = await captainModel.findById(captainId)

        const ride = await rideService.confirmRide(rideId,captain);

        console.log("sending messahes to socket id", ride.user.socketId)
        sendMessageToSocketId(ride.user.socketId,{
            event: 'ride-confirmed',
            data: ride
        })
                console.log("SENT messahes to socket id", ride.user.socketId)


        if (!ride) {
            return res.status(404).json({ message: "Ride not found or already confirmed" });
        }

        res.status(200).json({
            success: true,
            message: "Ride confirmed successfully",
            ride
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports.startRide = async (req, res) => {
    console.log("sadjnjhasjkdjkhasghdsahjkhajksdhjkhdsajkhjkh")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log("dsaknjklaskdjklashdhdfghjsbjkbdsjbfdhjklshjfhjbgdshbgfhbgdshgjhk")
        const { rideId,otp } = req.query;

        const ride = await rideService.startRide({rideId,otp,captain :req.captain});

        if (!ride) {
            return res.status(404).json({ message: "Ride not found or already started" });
        }

        res.status(200).json({
            success: true,
            message: "Ride started successfully",
            ride
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId } = req.body;

        const ride = await rideService.endRide({rideId,captain :  req.captain});

        

        if (!ride) {
            return res.status(404).json({ message: "Ride not found or already ended" });
        }

        sendMessageToSocketId(
            ride.user.socketId, 
            {
                event: 'ride-ended',
                data: ride
            }
        )

        res.status(200).json({
            success: true,
            message: "Ride ended successfully",
            ride
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}