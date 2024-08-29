const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const carsRoutes = require('./routes/carsRoutes.js');
const partRoutes = require("./routes/partRoutes.js")
const contactformRoutes = require('./routes/contactformRoutes.js');
const videoRoutes = require('./routes/videoroutes.js');
const bookingRoutes = require('./routes/bookingRoutes.js');
const cors = require('cors');
const fileUpload = require('express-fileupload');
;

const app = express();
app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Change this to the origin of your frontend app
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(fileUpload({
  useTempFiles: true,
}));

app.use(cookieParser());

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

const car = require('./routes/carsRoutes.js');
app.use('/api', car);

const part = require('./routes/partRoutes.js');
app.use('/api', part);

const submit = require('./routes/contactformRoutes.js');
app.use('/api', submit);

const video = require('./routes/videoroutes.js');
app.use('/api', video);

const booking = require('./routes/bookingRoutes.js');
app.use('/api', booking);



db.once('open', () => {
  console.log('Database connected successfully');

  app.use('/', userRoutes); // Mounting user authentication routes
  app.use('/', adminRoutes); // Mounting admin authentication routes // Mounting product authentication routes
  app.use('/', carsRoutes);
  app.use('/', partRoutes);
  app.use('/', contactformRoutes);
  app.use('/', videoRoutes);
  app.use('/', bookingRoutes);


  // Home page route
  app.get('/', (req, res) => {
    res.send('Welcome to Afghan Wheels!');
  });
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

// Export the app for Vercel
module.exports = app;
