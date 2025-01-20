const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Route to create a ride
router.post(
    '/create',
    authMiddleware.authUser, // Authentication middleware
    [
        // Validation for request body
        body('pickup')
            .isString()
            .isLength({ min: 3 })
            .withMessage('Invalid Pickup address'),
        body('destination')
            .isString()
            .isLength({ min: 3 })
            .withMessage('Invalid destination address'),
        body('vehicleType')
            .isString()
            .isIn(['auto', 'car', 'motorcycle'])
            .withMessage('Invalid vehicle type')
    ],
    rideController.createRide // Controller to handle the business logic
);

// Route to get fare
router.get(
    '/get-fare',
    authMiddleware.authUser,
    [
        query('pickup')
            .isString()
            .isLength({ min: 3 })
            .withMessage('Invalid pickup location'),
        query('destination')
            .isString()
            .isLength({ min: 3 })
            .withMessage('Invalid destination')
    ],
    rideController.getFare // Controller to handle the business logic
);

module.exports = router;
