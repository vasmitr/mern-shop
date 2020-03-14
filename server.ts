/* eslint-disable no-console */
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';

import users from './routes/api/users';
import catalog from './routes/api/catalog';
import orders from './routes/api/orders';
import admin from './routes/api/admin';

const env = dotenv.config();
dotenvExpand(env);

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// DB settings
const db = process.env.MONGO_URI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongo connected'))
    .catch((err) => console.error(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
import('./config/passport')
    .then((passportConfig) => passportConfig.default(passport));

// Use routes
app.use('/api/users', users);
app.use('/api/catalog', catalog);
app.use('/api/orders', orders);
app.use('/api/admin', admin);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is listen on ${PORT}`));
