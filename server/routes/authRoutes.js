import express from "express";
import passport from "../middleware/Passport/setup.js";

import { signin, signup, ppLogin, loginSuccess, loginFailure } from "../controllers/authController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi from /auth/");
});
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/login-passport",ppLogin);

router.get("/login-success", loginSuccess);
router.get("/login-failure", loginFailure);

export default router;
