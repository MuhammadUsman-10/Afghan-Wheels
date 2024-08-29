const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/adminschema.js');
const jwt = require('jsonwebtoken');
const isAdmin = require('../middleware/isAdmin.js'); // Import the admin authentication middleware
const router = express.Router();

// Admin Sign-up endpoint
router.post('/admin/signup', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 15);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();
    res.status(200).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering admin' });
  }
});

// Admin Sign-in endpoint
router.post('/admin/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const secretkey= "#hhfu7%jhf!y90#gyo02%";
    const token = jwt.sign({ admin }, secretkey);

        res.status(200);
        res.json({
          _id: admin._id,
          email: admin.email,
          role: admin.role,
          token: token
        }); // Sending the generated token in response
    
  } catch (error) {
    res.status(500).json({ message: 'Error signing in' });
  }
});


// Update a admin
router.put('/admin/profile', isAdmin.authAdmin ,async (req, res) => {
  const admin = await Admin.findById(req.admin._id);
  if(admin){
      admin.email = req.body.email || admin.email
      admin.mobile = req.body.mobile || admin.mobile
      if (req.body.password){
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          admin.password = hashedPassword;
      }
  
      const updatedadmin = await admin.save();
      res.json({
          _id: updatedadmin._id,
          email: updatedadmin.email,
          role: updatedadmin.role
      });
  } else {
      res.status(404)
      throw new Error('Admin not found');
  }  
});

router.get('/admin/profile', isAdmin.authAdmin ,async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if(admin){
      res.json({
      _id: admin._id,
      email: admin.email,
      role: admin.role,
      }) 
    }else {
      res.status(404)
      throw new Error('Admin not found');
    } 
  } catch (error) {
    console.error('Error fetching admin:', error);
    res.status(500).json({ error: 'Server error' });
  } 
});

module.exports = router;