const express = require('express');
const Car = require('../models/carschema');
// const isAdmin = require ('../middleware/isAdmin');

const router = express.Router();

// Get all cars
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

// router.get('/cars/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;

//     // Use findById to retrieve a single product based on the id
//     const product = await Car.findById(productId);

//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Add a new product
// router.post('/addcar' , isAdmin.authAdmin, async (req, res) => {
//   const { name, model, price, category, imageUrl, description } = req.body;
//   try {
//     const newProduct = new Car({ name, model, price, category, imageUrl, description });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update a product by ID
// router.put('/cars/:id', isAdmin.authAdmin, async (req, res) => {
//   const { id } = req.params;
//   const { name, model, price, category, imageUrl, description } = req.body;
//   try {
//     const updatedProduct = await Car.findByIdAndUpdate(
//       id,
//       { name, model, price, category, imageUrl, description },
//       { new: true }
//     );
//     res.json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Delete a product by ID
// router.delete('/cars/:id', isAdmin.authAdmin, async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedProduct = await Car.findByIdAndDelete(id);
//     res.json({ message: 'Product deleted', deletedProduct });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
