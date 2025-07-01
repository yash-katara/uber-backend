const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');   
app.use(cors());
const userRoutes = require('./routes/user.routes')

app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/user' , userRoutes)
module.exports = app;