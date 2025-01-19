const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto =require('crypto');


async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
        throw new Error('Unable to calculate distance and time');
    }

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };

    // Convert distance from '39.2 km' to a number (e.g., 39.2)
    const distance = parseFloat(distanceTime.distance.replace(' km', '').trim());

    // Convert duration from '1 hour 16 mins' to total minutes (e.g., 76 minutes)
    const durationParts = distanceTime.duration.split(' ');
    let totalMinutes = 0;

    for (let i = 0; i < durationParts.length; i++) {
        if (durationParts[i].includes('hour')) {
            totalMinutes += parseInt(durationParts[i - 1]) * 60;
        }
        if (durationParts[i].includes('min')) {
            totalMinutes += parseInt(durationParts[i - 1]);
        }
    }

    const fare = {
        auto: baseFare.auto + (distance * perKmRate.auto) + (totalMinutes * perMinuteRate.auto),
        car: baseFare.car + (distance * perKmRate.car) + (totalMinutes * perMinuteRate.car),
        motorcycle: baseFare.motorcycle + (distance * perKmRate.motorcycle) + (totalMinutes * perMinuteRate.motorcycle)
    };

    return { fare, distance, totalMinutes };  // Return distance and totalMinutes as well
}
function getOtp(num)
{
    function genrateOtp(num){
        const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
        return otp;
    }
    return genrateOtp(num);
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    try {
        const { fare, distance, totalMinutes } = await getFare(pickup, destination);

        if (!fare[vehicleType]) {
            throw new Error('Invalid vehicle type');
        }

        const ride = await rideModel.create({
            user,
            pickup,
            destination,
            fare: fare[vehicleType],
            distance,  // Save the distance
            duration: totalMinutes,  // Save the total minutes (duration)
            otp:getOtp(6)
        });

        return ride;

    } catch (error) {
        throw new Error(`Error creating ride: ${error.message}`);
    }
};
