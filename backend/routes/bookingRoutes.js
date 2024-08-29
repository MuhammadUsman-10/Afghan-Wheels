const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

router.post('/bookings', async (req, res) => {
    try {
        const { firstname, lastname, email, mobile, fromAddress, toAddress, message } = req.body;
    // Log incoming email for debugging
    console.log('Checking for existing booking with email:', email);

    const existingBooking = await Booking.findOne({ email });

    // Log the result of the query
    console.log('Existing booking found:', existingBooking);

    if (existingBooking) {
        return res.status(400).json({ error: 'Booking already exists' });
    }

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
      if (error.code === 11000) {
        return res.status(400).json({ error: 'A booking with this email already exists.' });
    }
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/bookings', async (req, res) => {
    try {
      // Fetch all bookings from the database
      const bookings = await Booking.find();
  
      // Send the bookings back as a response
      res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

    // Delete a booking
router.delete('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedbooking = await Booking.findByIdAndDelete(id);
    if (!deletedbooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
  
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  });

module.exports = router;