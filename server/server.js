// "This product uses the TMDb API but is not endorsed or certified by TMDb."
// LOOK INTO EXPRESS VALIDATOR

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import tmdbRoutes from "./service/tmdb.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";

//import passport from "./middleware/Passport/setup.js";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();

const app = express();

// TO DO Add to orign once deployed
const corsOptions = {
  origin: 'http://localhost:3000',
  allowedHeaders: ['content-type','set-cookie'],
  credentials: true,
}

// May be an issue later, "express.json" , "express.urlencoded", bodyParser deprecated ?
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

// CURRENTLY HAVE A COOKIE WITH USER._ID 
// req.session.passport
var sesh = {
  secret: process.env.SSN_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    maxAge: 1000 * 60 * 3,
  },
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sesh.cookie.secure = true
}

app.use(session(sesh));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res,next) => {
  res.send("Hello World, cookie please?");
})
app.use("/api/tmdb", tmdbRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);

// Potential error handler
// app.use(async (req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });
//
// app.use((error, req, res, next) => {
//   res.status(error.status);
//   res.json({ message: error.message });
// });

const PORT = process.env.PORT || 8082;

// Connect Database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
