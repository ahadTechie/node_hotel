const mongoose = require('mongoose');
require('dotenv').config();
 
// const mongoURL = 'mongodb://localhost:27017/hotels';
const mongoURL = process.env.DB_URL;
// Corrected the option name to useNewUrlParser
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;
