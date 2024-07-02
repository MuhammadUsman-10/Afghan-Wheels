const mongoose = require('mongoose');

// Define Product Schema
const carschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category:{
    type: String
  },
  variant:{
    type: String
  },
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define Product model
const Car = mongoose.model('Product', carschema);

module.exports = Car;
