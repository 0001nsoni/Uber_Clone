const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, 'first name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minLength: [3, 'last name must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, 'Email must be at least 12 character long'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String
    }
});
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this }, process.env.JWT_SECRET);
    return token;
};
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};
// Creating and exporting the model
const UserModel = mongoose.model('User', userSchema); // Use a capitalized model name
module.exports = UserModel;