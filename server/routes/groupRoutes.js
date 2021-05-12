import express from "express";
import passport from "../middleware/Passport/setup.js";

import {
  getGroupById,
  createGroup,
  addUser,
  changeUserRole,
} from "../controllers/groupController.js";
import Group from "../models/Group.js";

const router = express.Router();

router.get("/test/:id", getGroupById);
router.post("/create", createGroup);
router.post("/add", addUser);
router.post("/change", changeUserRole);

import { body } from "express-validator";
import User from "../models/User.js";
import { validateRequest } from "../middleware/validateRequest.js";

router.post(
  "/test",
  passport.authenticate("local-login"),
  body().custom((value) => {
    const { group, user } = value;
    console.log(value);
    console.log(group);
    console.log(user);
  }),
  validateRequest,
  passport.authenticate("local-login"),
  async (req, res) => {
    const { group } = req.body;
    res.send(group);
  }
);

export default router;
