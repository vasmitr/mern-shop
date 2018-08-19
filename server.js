// Load config
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const products = require('./routes/api/products');
const orders = require('./routes/api/orders');


const app = express();

// DB settings
const db = process.env.MONGO_URI;
mongoose.connect(db)
    .then(() => console.log('Mongo connecteg'))
    .catch((err) => console.log(err));

app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/orders', orders);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is listen on ${PORT}`));