const express = require('express');

const users = require('./routes/api/users');
const products = require('./routes/api/products');
const orders = require('./routes/api/orders');


const app = express();

app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/orders', orders);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is listen on ${PORT}`));