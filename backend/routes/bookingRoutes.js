const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

router.post('/bookings', async (req, res) => {
    try {
        const { firstname, lastname, email, mobile, fromAddress, toAddress, message } = req.body;
    
        const newBooking = new Booking({
            firstname,
            lastname,
            email,
            mobile,
            fromAddress,
            toAddress,
            message,
        });
    
        await newBooking.save();
    
        res.status(201).json({ message: 'Booking successfully created' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;