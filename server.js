// Load config
require('dotenv').config();

// Packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Project
const users = require('./routes/api/users');
const products = require('./routes/api/products');
const orders = require('./routes/api/orders');


const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB settings
const db = process.env.MONGO_URI;
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('Mongo connecteg'))
    .catch((err) => console.log(err));

// Use routes
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/orders', orders);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is listen on ${PORT}`));