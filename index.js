const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const URI = process.env['MONGO_URI'];
const {urlRouter} = require('./url/router.js');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Middleware
app.use('', urlRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  mongoose.connect(URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })  
});

