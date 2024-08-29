const mongoose = require('mongoose');

// Define Product Schema
const partschema = new mongoose.Schema({
  partName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: String,
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
const AutoParts = mongoose.model('AutoParts', partschema);

module.exports = AutoParts;
