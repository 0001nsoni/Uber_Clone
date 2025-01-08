const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vichleType
}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vichleType) {
        throw new Error('All fields are required');
    }
    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vechile: {
            color,
            plate,
            capacity,
            vichleType
        }
    });
    return captain;
};