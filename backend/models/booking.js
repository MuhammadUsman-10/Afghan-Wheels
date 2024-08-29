// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: { 
        type: String, 
    },
    email: { 
        type: String, 
        required: true,
        unique: true 
    },
    mobile: { 
        type: String, 
    },
    fromAddress: { 
        type: String, 
    },
    toAddress: { 
        type: String, 
    },
    message: { 
        type: String,
    },
}, {
    timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;