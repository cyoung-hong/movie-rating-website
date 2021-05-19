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
