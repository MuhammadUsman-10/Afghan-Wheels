const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    },
    verifyUser: {
        type: Boolean,
        default: false
    }
});

//Define User Model
const User= mongoose.model('User', userschema);
module.exports = User;
