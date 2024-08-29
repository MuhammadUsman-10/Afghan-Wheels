const express = require('express');
const ContactForm = require('../models/contactschema.js');
const Subscription = require('../models/subscribe.js');
const { EmailSubscribe } = require('../services/emailService.service.js');
const router = express.Router();



router.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const contactform = new ContactForm({ name, email, message});
        await contactform.save();
        res.status(200).send('Form Submitted Successfully');
    } catch (error) {
        res.status(500).send('Error Submitting form');
    }
});

router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the email is already subscribed
        const existingSubscription = await Subscription.findOne({ email });

        if (existingSubscription) {
            return res.status(400).json({ error: 'Email is already subscribed.' });
        }

        // Store the new subscription in the database
        const newSubscription = new Subscription({ email });
        await newSubscription.save();
        
         // EmailSubscribe ko await ke sath call karein
        let emailresponse = await EmailSubscribe(email, 'Newsletter Subscription');
        console.log({ emailresponse });

         // Agar email successfully send ho jaye to success response bhejain
        if (emailresponse.message === "Send successfully") {
            return res.status(200).json({ message: 'Subscription successful!' });
        } else {
             // Agar email send fail ho jaye to error response bhejain
            return res.status(500).json({ error: 'Error subscribing, please try again later.' });
        }
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'A booking with this email already exists.' });
        }
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Error subscribing, please try again later.' });
    }
});

module.exports = router;