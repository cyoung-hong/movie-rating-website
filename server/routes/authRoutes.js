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
import auth from "../middleware/Passport/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi from /auth/");
});
router.post("/signin", signin);
router.post("/signup", signup);

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

router.get("/login-authenticated", (req, res) => {
  console.log("Authenticated route");
  if (req.user) {
    console.log(req);
  } else {
    res.json({ msg: "Session expired" });
  }
  //console.log(res.user);
  res.send(req?.user);
});

router.get("/login-success", loginSuccess);
router.get("/login-failure", loginFailure);

router.get('/user', (req, res) => {
  if(req.isAuthenticated()) {
    res.send(req.user.name);
  }
})

export default router;

// router.post(
//   "/login-passport",
//   passport.authenticate("local-login"),
//   (req, res, next) => {
//     //const {user} = req.session.password.user;
//     if (req.isAuthenticated()) {
//       console.log(req.isAuthenticated());
//     } else {
//       console.log(req.isAuthenticated());
//     }
//     res.send(req.session.passport.user);
//   }
// );
