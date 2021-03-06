import express from "express";
import passport from "../middleware/Passport/setup.js";
import mongoose from 'mongoose';

import {
  signin,
  signup,
} from "../controllers/authController.js";

import { signupSchema, signinSchema } from "../middleware/schema/authSchema.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/signin", passport.authenticate("local-login"), signin);

router.post("/signup", signupSchema, validateRequest, signup);

router.post("/logout", (req, res) => {
  req.session = null;
  res.clearCookie('connect.sid').redirect('/');
});

export default router;


// TEST ROUTES, REMOVE WHEN NOT NEEDED
// router.post("/test", signupSchema, validateRequest, (req, res) => {
//   res.sendStatus(201);
// });

// Has error handling  middleware example
//
// router.post("/login", passport.authenticate("local-login"), (req, res) => {
//   if (req.isAuthenticated()) {
//     const user = req.user.name;
//     res.status(201).json(user);
//   } else {
//     res.json({
//       error: {
//         status: 401,
//         message: "User not found",
//       },
//     });
//   }
// });

