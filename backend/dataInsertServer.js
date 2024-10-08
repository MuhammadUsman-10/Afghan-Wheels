const express = require('express');
const mongoose = require('mongoose');
const carschema = require('./models/carschema.js'); // Path might differ
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

// MongoDB Connection
const uri = 'mongodb://127.0.0.1:27017/Afghan-Wheels'; 
mongoose.connect(uri)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const dataPath = path.join(__dirname, './cars/cars.json');

fs.readFile(dataPath, 'utf8', async (err, data) => {
    if (err) {
    console.error(err);
    return;
    }

    try {
    const carsData = JSON.parse(data);
    await carschema.insertMany(carsData);
    console.log('Data inserted successfully');
    
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        mongoose.disconnect();
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
