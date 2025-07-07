const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapsService = require('./maps.service')
const crypto = require('crypto');

async function getFare(pickup,destination){
    if (!pickup || !destination) {
        throw new Error("Pickup and Destination are required");
    }
    const distanceTime  = await mapsService.getDistanceTime(pickup, destination);

    const baseFareCar = 50; // Base fare for car
    const baseFareMotorcycle = 30; // Base fare for motorcycle
    const costPerKmCar = 10; // Cost per kilometer for car
    const costPerKmMotorcycle = 5; // Cost per kilometer for motorcycle

    console.log(distanceTime)
    const fareCar = baseFareCar + (distanceTime.distance.value/1000 * costPerKmCar);
    const fareMotorcycle = baseFareMotorcycle + (distanceTime.distance.value/1000 * costPerKmMotorcycle);

    return { fareCar, fareMotorcycle };
    
}

module.exports.getFare = getFare;

function getOtp(num) {
    const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
    return otp;
}

module.exports.createRide = async ({ user, pickup, destination, vechicleType }) => {
    if (!user || !pickup || !destination || !vechicleType) {
        throw new Error("All Fields are Required");
    }

    const fare = await getFare(pickup, destination);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        fare: vechicleType === 'car' ? fare.fareCar : fare.fareMotorcycle,
        otp : getOtp(6)
    });

    return ride;

}


module.exports.confirmRide = async (rideId, captain) => {

  if (!rideId || !captain) {
    throw new Error("Ride ID and Captain ID are required");
  }
  // First, update the ride
  await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      captain: captain,
      status: "accepted",
    }
  );

  // Then fetch the updated ride with populated user
  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user").select('+otp');

  if (!ride) {
    throw new Error("Ride not found or could not be updated");
  }

  return ride;
};
 

module.exports.startRide = async ({rideId,otp,captain}) => {
  if (!rideId || !otp || !captain) {
    throw new Error("Ride ID, OTP, and Captain ID are required");
  }

  // Find the ride by ID and check the OTP
  const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');

  if (!ride) {
    throw new Error("Invalid OTP or Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride is not in accepted status");
  }
  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }
  
  await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "ongoing",

    }
  )

  sendMessageToSocketId(
    ride.user.socketId , {
      event: 'ride-started',
      data: ride
    }
  )
  
  await ride.save();

  return ride;

}


module.exports.endRide = async ({rideId,captain}) => {
  if (!rideId || !captain) {
    throw new Error("Ride ID and Captain ID are required");
  }

  const ride = await rideModel.findOne({ _id: rideId,captain:captain._id }).populate('user').populate('captain').select("+otp")

  if (!ride) {
    throw new Error("Ride not found or already ended");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride is not in ongoing status");
  }

  await rideModel.findOneAndUpdate({
    _id: rideId
  }, {
    status: "completed"
  })

  return ride ;
}