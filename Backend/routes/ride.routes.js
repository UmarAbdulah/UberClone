const express = require('express');
const router = express.Router();
const {body,query} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middlewares');

router.post('/create',authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage("Invalid Pickup Location"),
    body('destination').isString().isLength({ min: 3 }).withMessage("Invalid destination Location"),
        body('vehicleType').isString().isIn(['car','bike' ]).withMessage("Invalid vehicle Location"),
        rideController.createRide

)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min : 3 }).withMessage("Invalid Pickup Location"),
    query('destination').isString().isLength({min : 3 }).withMessage("Invalid Destination Location"),
    rideController.getFare
)

router.post('/confirm-ride',authMiddleware.authCaptain,rideController.confirmRide);


router.get('/start-ride',authMiddleware.authCaptain,rideController.startRide);
module.exports = router ;


router.post(
    '/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage("Invalid Ride Id"),
    rideController.endRide
)