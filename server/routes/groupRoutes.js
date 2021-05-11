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

router.post("/test", async (req, res) => {
  const {group} = req.body;

  const existingGroup = await Group.findOne({ _id: group.id});
  console.log(req.user);
  console.log(adminCheck(req.user, existingGroup));
});

export default router;
