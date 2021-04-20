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

import {signupSchema, signinSchema} from '../middleware/schema/authSchema.js';
import {validateRequest} from '../middleware/validateRequest.js';

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi from /auth/");
});

router.post("/signin", signinSchema, validateRequest, signin);
router.post("/signup", signupSchema, validateRequest, signup);


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

router.post("/login-test", loginTest);
router.get("/login-success", loginSuccess);
router.get("/login-failure", loginFailure);

router.get('/user', (req, res) => {
  if(req.isAuthenticated()) {
    res.send(req.user.name);
  }
})

// TEST ROUTES, REMOVE WHEN NOT NEEDED
router.post("/test", signupSchema, validateRequest, (req, res) => {
  res.sendStatus(201);
})

export default router;

