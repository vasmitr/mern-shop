// Load config
require('dotenv').config();

// Packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Project
const users = require('./routes/api/users');
const catalog = require('./routes/api/catalog');
const orders = require('./routes/api/orders');
const admin = require('./routes/api/admin');


const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB settings
const db = process.env.MONGO_URI;
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongo connecteg'))
    .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/catalog', catalog);
app.use('/api/orders', orders);
app.use('/api/admin', admin);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is listen on ${PORT}`));