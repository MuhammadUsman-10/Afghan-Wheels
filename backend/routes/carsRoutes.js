const express = require('express');
const Car = require('../models/carschema');
const isAdmin = require ('../middleware/isAdmin');

const router = express.Router();

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // try {
  //   // Check if a form parameters is provided in the query
  //   const {name, brand, category, price, variant} = req.body;

  //   if (brand && category && price && variant) {
  //     // If parameters are provided, filter cars
  //     const cars = await Car.find({ name, brand, price, category, variant });
  //     res.json(cars);
  //   } else {
  //     // If no parameters are provided, return all cars
  //     const cars = await Car.find();
  //     res.json(cars);
  //   }
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
});

router.get('/cars/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Use findById to retrieve a single product based on the id
    const product = await Car.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new product
router.post('/addcar' , isAdmin.authAdmin, async (req, res) => {
  const { name, model, price, category, imageUrl, description } = req.body;
  try {
    const newProduct = new Car({ name, model, price, category, imageUrl, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product by ID
router.put('/cars/:id', isAdmin.authAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, model, price, category, imageUrl, description } = req.body;
  try {
    const updatedProduct = await Car.findByIdAndUpdate(
      id,
      { name, model, price, category, imageUrl, description },
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

module.exports = router;
