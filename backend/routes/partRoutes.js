const express = require('express');
const cloudinary = require('cloudinary').v2;
const Part = require('../models/parts.js');

const router = express.Router();

cloudinary.config({ 
    cloud_name: 'doq6hhhlo', 
    api_key: '975522712375348', 
    api_secret: 'WbXSSL3aC1pqX27lZcOXtJTZweo' // Click 'View API Keys' above to copy your API secret
});



// Get all cars
router.get('/parts', async (req, res) => {
    try {
        const part = await Part.find();
    
        if (!part) {
            return res.status(404).json({ error: 'Part not found' });
        }
    
        res.json(part);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

  // Route to get car details by slug
router.get('/parts/:slug', async (req, res) => {
    try {
        const part = await Part.findOne({ title: req.params.slug });
    
        if (!part) {
            return res.status(404).json({ message: 'Part not found' });
        }
    
        res.json(part);
    } catch (err) {
        console.error('Error fetching Part:', err); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

  // Add a new product
router.post('/addpart' , async (req, res) => {
    const { partName, price, description } = req.body;
    const file = req.files?.image;
    try {
        cloudinary.uploader.upload(file.tempFilePath, async (err, result)=>{
            if(err){
            return res.status(500).json({ errors: ['Server error'] });
            }
            console.log(result);
            const newPart = new Part({
                partName,
                price,
                description,
                imageUrl: result.url
            });
    
            await newPart.save();
            res.status(201).json({ message: 'Car information submitted successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

  // Update a product by ID
// router.put('/parts/:id', async (req, res) => {
//     const { id } = req.params;
//     const { partName, price, imageUrl, description } = req.body;
//     try {
//         const updatedProduct = await Part.findByIdAndUpdate(
//             id,
//             { partName, price, imageUrl, description },
//             { new: true }
//         );
//         res.json(updatedProduct);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

  // Delete a product by ID
router.delete('/parts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Part.findByIdAndDelete(id);
        res.json({ message: 'Part deleted', deletedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;