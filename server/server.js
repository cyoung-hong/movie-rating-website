// "This product uses the TMDb API but is not endorsed or certified by TMDb."
// LOOK INTO EXPRESS VALIDATOR

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import tmdbRoutes from './service/tmdb.js'
import ratingRoutes from './routes/ratingRoutes.js';
import userRoutes from './routes/userRoutes.js'
import recommendationRoutes from './routes/recommendationRoutes.js';

var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var session = require('express-session'), bodyParser = require('body-parser');


dotenv.config();

const app = express();

// May be an issue later, "express.json" , "express.urlencoded", bodyParser deprecated ?
app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());



app.use('/api/tmdb', tmdbRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/user', userRoutes);

app.use(async (req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next) => {
    res.status(error.status);
    res.json({message: error.message});
});

const PORT = process.env.PORT || 8082;

// Connect Database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));



