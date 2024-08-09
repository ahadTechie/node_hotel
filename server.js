const express = require('express');
require('dotenv').config();

const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const passport = require('./auth');
const Person = require('./models/person');
const LocalStrategy = require('passport-local').Strategy;
app.use(bodyParser.json());


app.use(passport.initialize());
const LocalAuthMiddleware = passport.authenticate('local', { session: false });

const menuItemRoutes = require('./routes/menuRoutes');
app.use('/menu', menuItemRoutes);

const personRoutes = require('./routes/personRoutes');
app.use('/person', LocalAuthMiddleware, personRoutes);

const PORT = process.env.PORT || 3000; // Added fallback to port 3000 if not set in env

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    // console.log('Received credentials:', username, password);
    const user = await Person.findOne({ username }); // Corrected method name from 'find0ne' to 'findOne'
    if (!user)
      return done(null, false, { message: "Incorrect username." });
    const isPasswordMatch = await user.comparePassword(password);
    if (isPasswordMatch)
      return done(null, user);
    else
      return done(null, false, { message: 'Incorrect password.' });
  } catch (error) {
    return done(error);
  }
}));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); // Updated to use dynamic port value
})



