const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');   
app.use(cors());
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const captianRoutes = require('./routes/captian.routes')
const mapsRoutes = require('./routes/maps.routes')
app.use(express.json());
app.use(cookieParser())



app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/user' , userRoutes);
app.use('/captians', captianRoutes);
app.use('/maps', mapsRoutes);

module.exports = app; 