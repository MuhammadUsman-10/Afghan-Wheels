// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    firstname: {
        type: String, 
        required: true 
    },
    lastname: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 

    },
    mobile: { type: String, required: true 

    },
    fromAddress: { 
        type: String, 
        required: true 

    },
    toAddress: { 
        type: String, 
        required: true

    },
    message: { 
        type: String 
    },
}, {
    timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;