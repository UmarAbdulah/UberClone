const express = require('express');
const router = express.Router();
const captainController = require("../controllers/captain.controller");
const {body} = require("express-validator");

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name must be at least 3 characters long'),
    body('password').isLength({min : 6}).withMessage("Password must be atleast 6 characters long"),
    body('vehicle.color').isLength({min:3}).withMessage('Color name must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate number must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'autoZ']).withMessage('Invalid vehicle type'),
],captainController.registerCaptain)

module.exports = router