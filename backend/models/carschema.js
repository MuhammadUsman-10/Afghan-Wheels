const mongoose = require('mongoose');

// Define Product Schema
const carschema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  variant:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  imageURL: String,
  description:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define Product model
const Car = mongoose.model('Cars', carschema);

module.exports = Car;
