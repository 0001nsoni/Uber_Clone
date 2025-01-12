const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model'); // Add this line
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
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

module.exports.authCaptain = async (req, res, next) => {
    const token =
        (req.cookies && req.cookies.token) ||
        (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Check if the token is blacklisted
        const isBlacklisted = await BlacklistToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Access denied. Token blacklisted.' });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the captain based on the decoded token
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: 'Access denied. Captain not found.' });
        }

        // Attach the captain to the request object
        req.captain = captain;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
