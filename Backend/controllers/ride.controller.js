const rideService = require('../service/ride.service');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array(),
        });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        // Call the ride service to create a ride
        const ride = await rideService.createRide({
            user: req.user._id, // Authenticated user ID
            pickup,
            destination,
            vehicleType,
        });

        // Success response
        return res.status(201).json({
            message: 'Ride created successfully',
            ride,
        });

    } catch (err) {
        console.error('Error creating ride:', err.message);

        // Distinguish between server and client errors
        if (err.message.includes('Unable to fetch distance data') || err.message.includes('Invalid vehicle type')) {
            return res.status(400).json({
                message: `Ride creation failed: ${err.message}`,
                suggestion: 'Please verify the pickup, destination, and vehicle type.',
            });
        }

        // Generic server error response
        return res.status(500).json({
            message: 'An unexpected error occurred while creating the ride. Please try again later.',
        });
    }
};
module.exports.getFare = async(req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty())
{
    return res.status(400).json({errors:errors.array()});

}
const {pickup,destination}=req.query;
try{
    const fare=await rideService.getFare(pickup,destination);
    return res.status(200).json(fare);
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
};