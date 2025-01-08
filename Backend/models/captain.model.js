const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,'first name must be at least 3 characters long']
        },
        lastname:{
            type:String,
            minLength:[3,'last name must be at least 3 characters long']
        }
    },
    email : {
        type:String,
        required:true,
        unique:true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],

    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vechile:{
        color:{
            type:String,
            required:true,
            minLength:[3,'color must be at least 3 characters long']
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,'plate must be at least 3 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'capacity must be at least 1']
        },
        vichleType:{
            type:String,
            enum:['auto','car','motorcycle'],
            required:true
        },
        location:{
           lat:{
            type:Number,
           },
           lng:{
            type:Number,
           }

        }
    }
})

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const CaptainModel = mongoose.model('Captain', captainSchema);
module.exports = CaptainModel;