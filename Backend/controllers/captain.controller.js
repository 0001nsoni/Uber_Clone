const CaptainModel = require('../models/captain.model');    
const captainService = require('../service/captain.service');
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model'); // Add this line

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;
    const isCaptainAlreadyExist = await CaptainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ error: 'Captain already exists' });
    }

    const hashedPassword = await CaptainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vichleType: vehicle.vehicleType
    });
    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await CaptainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({ error: 'Invalid Email or Password' });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid Email or Password' });
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}
module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    try {
        // Check if the token is already blacklisted
        const existingToken = await BlacklistToken.findOne({ token });

        if (!existingToken) {
            // If the token is not already blacklisted, add it
            await BlacklistToken.create({ token });
        }

        // Clear the token cookie
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successfully' });
    } catch (error) {
        next(error); // Handle any errors that occur
    }
};
