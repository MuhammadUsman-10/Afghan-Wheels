const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/userschema.js');
const isAdmin = require('../middleware/isAdmin.js');
const isUser = require('../middleware/isUser.js'); // Import the authentication middleware
const emailService = require("../services/emailService.service");
const router = express.Router();

// Sign Up endpoint
router.post('/signup', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, mobile, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstname,
            lastname,
            email,
            mobile,
            password: hashedPassword,
        });
        await user.save();

        const verificationLink = `http://localhost:3000/EmailVerificationLogin?email=${email}&password=${password}&login_using_gmail=true`;
        let response = emailService(email, 'Email Verification', verificationLink, 'Email Verification for Login');
        console.log({response});
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            message: 'User registered successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});


// Sign In endpoint
router.post('/signin', async (req, res) => {
    const { email, password, loginUsingGmail } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }
        if (email) {
            const existedUser = await User.findOne({ email });
            if (existedUser) {
                if (loginUsingGmail) {
                    existedUser.verifyUser = true;
                    await existedUser.save();
                }
                if (!existedUser.verifyUser) {
                    return res.status(401).send('Please Verify Your Email');
                }
                const secretKey = '@djfsjjsv&khg#ggt452!i0%3J4KK'; 
                const token = jwt.sign({ user }, secretKey);
                res.status(200); // Sending the generated token in response
                res.json({
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    mobile: user.mobile,
                    role: user.role,
                    token: token
                });
            } else {
                return res.status(401).send("Your email is not correct");
            }
        }
    } catch (error) {
        res.status(500).send('Error signing in');
    }
});

// Get all users
router.get('/users', async (req, res) => {
    // res.send('User profile page');
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get user by ID
router.get('/users/:id', isAdmin.authAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
        });
        } catch (error) {
        res.status(500).send('Server error');
    }
});

// Update a customer
router.put('/users/profile', isUser.authUser ,async (req, res) => {
        const user = await User.findById(req.user._id);
        if(user){
            user.firstname = req.body.firstname || user.firstname
            user.lastname = req.body.lastname || user.lastname
            user.email = req.body.email || user.email
            user.mobile = req.body.mobile || user.mobile
            if (req.body.password){
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                user.password = hashedPassword;
            }
        
            const updateduser = await user.save();
            res.json({
                _id: updateduser._id,
                firstname: updateduser.firstname,
                lastname: updateduser.lastname,
                email: updateduser.email,
                mobile: updateduser.mobile,
                role: updateduser.role
            });
        } else {
            res.status(404)
            throw new Error('User not found');
        }  
});

router.get('/users/profile', isUser.authUser ,async (req, res) => {
    try {
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        }) 
    }else {
        res.status(404)
        throw new Error('User not found');
    } 
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Server error' });
    } 
});

  // Delete a user
router.delete('/users/:id', isAdmin.authAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const deleteduser = await User.findByIdAndDelete(id);
        if (!deleteduser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
