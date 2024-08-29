const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
    email: { 
    type: String, 
    required: true 
    },
    code: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: '10m' 
    }
});

module.exports = mongoose.model('Verification', VerificationSchema);
