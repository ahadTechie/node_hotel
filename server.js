const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();

const menuItemRoutes = require('./routes/menuRoutes');
app.use('/menu', menuItemRoutes)

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("listening on port 3000");
})


// just testing git features