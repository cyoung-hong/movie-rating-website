// "This product uses the TMDb API but is not endorsed or certified by TMDb."
// LOOK INTO EXPRESS VALIDATOR

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import tmdbRoutes from "./service/tmdb.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";

dotenv.config();

const app = express();

// May be an issue later, "express.json" , "express.urlencoded", bodyParser deprecated ?
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/tmdb", tmdbRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/user", userRoutes);

// app.use(async (req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

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
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// ===================================================== PASSPORT SETUP REQUIRMENTS ===================================================== //
// 1. Authentication strategies
// 2. Application middelware
// 3. Sessions
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/user.js";
import bcrypt from "bcryptjs";
import session from "express-session";
import MongoStore from "connect-mongo";

//var mongoStore = MongotStore(session);

// ===================== Strategy =================== //
passport.use(
  new LocalStrategy({ usernameField: "email" }, (username, password, done) => {
    User.findOne({ email: username })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        console.log(user);
        console.log(password);

        bcrypt.compare(password, user.password)
        .then((res) => {
            if(res) { return done(null, user); }
            else { return done(null, false); }
        });

      })
      .catch((err) => {
        done(err);
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

// ===================== Middleware =================== //
app.use(
  session({
    secret: process.env.SSN_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      maxAge: 1000 * 30,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: '/login-failure',
    successRedirect: '/login-success'
  }),
//   (req, res) => {
//       console.log(req.user);
//       console.log('Redirecting...');
//       res.redirect('/login-success');
//   }
);

app.get('/login-success', (req, res) => {
    console.log(req.session);
    console.log(req.user);
    res.send("Success");
})

app.get('/login-failure', (req, res) => {
    console.log(req);
    res.send("Cap");
})