const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const passport = require('./auth');
app.use(bodyParser.json());
require('dotenv').config();

app.use(passport.initialize());
const LocalAuthMiddleware = passport.authenticate('local', {session: false});

const menuItemRoutes = require('./routes/menuRoutes');
app.use('/menu', menuItemRoutes)

const personRoutes = require('./routes/personRoutes');
app.use('/person',LocalAuthMiddleware, personRoutes);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("listening on port 3000");
})


// just testing git features