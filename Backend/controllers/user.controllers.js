const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const BlacklistToken = require('../models/blacklistToken.model');
const userService = require('../service/user.service');

// Register User
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    try {
        const isUserAlready = await userModel.findOne({ email });
        if (isUserAlready) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await userModel.hashPassword(password);
        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
        });

        const token = user.generateAuthToken();
        res.status(201).json({ token, user });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        next(error);
    }
};

// Login User
module.exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();
        res.status(200).json({ token, user });
    } catch (error) {
        next(error);
    }
};

// Logout User
module.exports.logoutUser = async (req, res, next) => {
    const token =
        (req.cookies && req.cookies.token) ||
        (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (token) {
        try {
            // Check if the token is already blacklisted
            const existingToken = await BlacklistToken.findOne({ token });
            if (!existingToken) {
                // Add the token to the blacklist if it doesn't exist
                await BlacklistToken.create({ token });
            }
        } catch (error) {
            // Handle other errors
            return next(error);
        }
    }

    // Clear the token cookie and send a response
    res.clearCookie('token', { httpOnly: true });
    res.status(200).json({ message: 'Logged out successfully' });
};


// Auth Middleware for Users
module.exports.authUser = async (req, res, next) => {
    const token =
        (req.cookies && req.cookies.token) ||
        (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const isBlacklisted = await BlacklistToken.exists({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Access denied. Token blacklisted.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded._id);
        if (!req.user) {
            return res.status(401).json({ message: 'Access denied. User not found.' });
        }
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Auth Middleware for Captains
module.exports.authCaptain = async (req, res, next) => {
    const token =
        (req.cookies && req.cookies.token) ||
        (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const isBlacklisted = await BlacklistToken.exists({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Access denied. Token blacklisted.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: 'Access denied. Captain not found.' });
        }
        req.captain = captain;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Get User Profile
module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
};
