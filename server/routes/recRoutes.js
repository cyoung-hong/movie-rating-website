import express from "express";
import {
  getRecommendations,
  getMyRecs,
  getRecsById,
  createRec,
  getRecsByUser,
  deleteRec,
  updateRec,
} from "../controllers/recController.js";
import Request from "../models/Recommendation.js";

import passport from "../middleware/Passport/setup.js";

const router = express.Router();

router.get("/", getRecommendations);
router.get("/myRecs", getMyRecs);
router.get("/user/:userId", getRecsByUser);
router.get("/:id", getRecsById);

router.post("/create", createRec);

// FINISH PUT
router.patch("/update/:id", updateRec);

router.delete("/delete/:id", deleteRec);

export default router;
