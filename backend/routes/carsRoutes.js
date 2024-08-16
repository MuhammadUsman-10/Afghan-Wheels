const express = require('express');
const cloudinary = require('cloudinary').v2;
const Car = require('../models/carschema');
const Booking = require('../models/booking');
const isAdmin = require ('../middleware/isAdmin');

const router = express.Router();

cloudinary.config({ 
  cloud_name: 'doq6hhhlo', 
  api_key: '975522712375348', 
  api_secret: 'WbXSSL3aC1pqX27lZcOXtJTZweo' // Click 'View API Keys' above to copy your API secret
});

router.post('/searchcar', async (req, res) => {

  const {make, model, category, city, price, variant} = req.body;
  try {
    const query = {...(make && { make }),
      ...(model && { model }),
      ...(category && { category }),
      ...(variant && { variant }),
      ...(city && { city }),
      ...(price && { price: { $lte: price } }),
    };
    console.log(query)
    const cars = await Car.find(query);
    res.json(cars);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all cars
router.get('/cars', async (req, res) => {
  try {
    const product = await Car.find();

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get car details by slug
router.get('/cars/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    console.log('Received slug:', slug); // Log the received slug

    // Query by model instead of _id
    const car = await Car.findOne({ model: slug });

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(car);
  } catch (err) {
    console.error('Error fetching car:', err); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new product
router.post('/addcar' , async (req, res) => {
  const { make, model, price, variant, category, city, description } = req.body;
  const file = req.files?.image;
  try {
    cloudinary.uploader.upload(file.tempFilePath, async (err, result)=>{
      if(err){
        return res.status(500).json({ errors: ['Server error'] });
      }
      console.log(result);
        const newCar = new Car({
          category,
          make,
          model,
          city,
          price,
          variant,
          description,
          imageURL: result.url
        });

        await newCar.save();
        res.status(201).json({ message: 'Car information submitted successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product by ID
router.put('/cars/:id', async (req, res) => {
  const { id } = req.params;
  const { make, model, price, category, variant, city, imageURL, description } = req.body;
  try {
    const updatedProduct = await Car.findByIdAndUpdate(
      id,
      { make, model, price, category, variant, city, imageURL, description },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product by ID
router.delete('/cars/:id', isAdmin.authAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Car.findByIdAndDelete(id);
    res.json({ message: 'Product deleted', deletedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/becomeseller', async (req, res) => {
  const { category, make, model, city, price, variant, description } = req.body;
  const file = req.files?.image;
  if (!category || !make || !model || !city || !price || !variant || !description || !file) {
    return res.status(400).json({ errors: ['All fields are required'] });
  }
  try {
    cloudinary.uploader.upload(file.tempFilePath, async (err, result)=>{
      if(err){
        return res.status(500).json({ errors: ['Server error'] });
      }
      console.log(result);
      try {
        const newCar = new Car({
          category,
          make,
          model,
          city,
          price,
          variant,
          description,
          imageURL: result.url
        });

        await newCar.save();
        res.status(201).json({ message: 'Car information submitted successfully' });
      } catch (saveError) {
        console.error('Error saving car to database:', saveError); // Log any error from saving to the database
        res.status(500).json({ errors: ['Server error while saving car information'] });
      }
      });
  } catch (error) {
    res.status(500).json({ errors: ['Server error'] });
  }
});

router.post('/api/bookings', async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, fromAddress, toAddress, additionalInfo } = req.body;

    const newBooking = new Booking({
      firstName,
      lastName,
      email,
      mobile,
      fromAddress,
      toAddress,
      additionalInfo,
    });

    await newBooking.save();

    res.status(201).json({ message: 'Booking successfully created' });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
