const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const carsRoutes = require('./routes/carsRoutes.js');
const contactformRoutes = require('./routes/contactformRoutes.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const uri = 'mongodb://127.0.0.1:27017/Afghan-Wheels'; // Replace with your MongoDB URI
mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Database connection error:', err);
});



const signup = require('./routes/userRoutes.js');
app.use('/api', signup);

const login = require('./routes/userRoutes.js');
app.use('/api', login);

const admin = require('./routes/adminRoutes.js');
app.use('/api', admin);

const searchcar = require('./routes/carsRoutes.js');
app.use('/api', searchcar);

const submit = require('./routes/contactformRoutes.js');
app.use('/api', submit);



db.once('open', () => {
  console.log('Database connected successfully');

  app.use('/', userRoutes); // Mounting user authentication routes
  app.use('/', adminRoutes); // Mounting admin authentication routes // Mounting product authentication routes
  app.use('/', carsRoutes);
  app.use('/', contactformRoutes);

  // Home page route
  app.get('/', (req, res) => {
    res.send('Welcome to Afghan Wheels!');
  });
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
