const express = require('express');
const ContactForm = require('../models/contactschema.js');
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

module.exports = router;