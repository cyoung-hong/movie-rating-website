import express from "express";

import {
  getGroups,
  getGroupById,
  createGroup,
  addUser,
  changeUserRole,
  removeUser,
  deleteGroup,
} from "../controllers/groupController.js";

const router = express.Router();

router.get("/", getGroups);
router.get("/group/:id", getGroupById);
router.post("/create", createGroup);
router.post("/add", addUser);
router.post("/change", changeUserRole);
router.post("/remove", removeUser);
router.delete("/delete/:id", deleteGroup);

import User from "../models/User.js";
import Recommendation from "../models/Recommendation.js";

router.get("/create/test", async (req, res) => {
  console.log("In test route.");
  try {
    if (req.isAuthenticated()) {
      const memberRecommendation = await Recommendation.findOne({
        "recommender.userId": req.user._id,
      });
     

      res.status(201).json({ memberRecommendation });
    }
  } catch (err) {}
});

// Potential validation middleware
// import { body } from "express-validator";
// import { validateRequest } from "../middleware/validateRequest.js";
// router.post(
//   "/test",
//   passport.authenticate("local-login"),
//   body().custom((value) => {
//     const { group, user } = value;
//     console.log(value);
//     console.log(group);
//     console.log(user);
//   }),
//   validateRequest,
//   passport.authenticate("local-login"),
//   async (req, res) => {
//     const { group } = req.body;
//     res.send(group);
//   }
// );

export default router;
