const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ firstname ,lastname , email , password , color ,plate , capacity , vehcileType }) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehcileType) {
        throw new Error("All Fields are Required");
    };
    const captain = await captainModel.create({
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
            vehcileType
        }
    });
    return captain;
 } 