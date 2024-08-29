const mongoose = require('mongoose');

// Define Newsletter Schema
const subscribeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, 
    { timestamps: true }
);

const Subscription = mongoose.model('Subscription', subscribeSchema);
module.exports = Subscription;