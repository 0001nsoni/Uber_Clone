const mapService = require('../service/maps.service');
const { validationResult } = require('express-validator');

// Controller to get coordinates for an address
module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    try {
        const coordinates = await mapService.getAddressCoordinate(address);

        res.status(200).json({
            success: true,
            address,
            coordinates,
        });
    } catch (error) {
        res.status(404).json({ message: "Coordinates not found" });
    }
};

// Controller to get distance and time between origin and destination
module.exports.getDistanceTime = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;  // Correct the destructuring here

        const distanceTime = await mapService.getDistanceTime(origin, destination);  // Correct the variable name

        res.status(200).json(distanceTime);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports.getAutoCompleteSuggestions = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query; // Get input query from request
        if (!input) {
            return res.status(400).json({ message: "Input query is required" });
        }

        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        return res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};