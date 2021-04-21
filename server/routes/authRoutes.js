import express from "express";
import passport from "../middleware/Passport/setup.js";

import {
  signin,
  signup,
  ppLogin,
  loginTest,
  loginSuccess,
  loginFailure,
} from "../controllers/authController.js";

import { signupSchema, signinSchema } from "../middleware/schema/authSchema.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/signin", passport.authenticate('local-login'), signin);

router.post("/signup", signupSchema, validateRequest, signup);

router.get("/logout", (req,res) => {
  req.logOut();
  res.status(200).json({message: "Logged out."});
})

// Unsure if needed.
router.post("/login-test", loginTest);
router.get("/login-success", loginSuccess);
router.get("/login-failure", loginFailure);

router.get("/user", (req, res) => {
  console.log("hi");
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// TEST ROUTES, REMOVE WHEN NOT NEEDED
router.post("/test", signupSchema, validateRequest, (req, res) => {
  res.sendStatus(201);
});

// Has error handling  middleware example
//
router.post("/login", passport.authenticate("local-login"), (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user.name;
    res.status(201).json(user);
  } else {
    res.json({
      error: {
        status: 401,
        message: "User not found",
      },
    });
  }
});

export default router;
