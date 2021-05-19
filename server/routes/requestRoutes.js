import express from "express";
import {
  getRequests,
  getMyRequests,
  getRequestById,
  createRequest,
  getRequestsByUser,
  deleteRequest,
  updateRequest,
} from "../controllers/requestController.js";
import Request from "../models/Request.js";

import passport from "../middleware/Passport/setup.js";

const router = express.Router();

router.get("/", getRequests);
router.get("/request/myRequests", getMyRequests);
router.get("/request/user/:userId", getRequestsByUser);
router.get("/request/:id", getRequestById);

router.post("/create", createRequest);

// FINISH PUT
router.patch("/request/update/:id", updateRequest);

router.delete("/request/delete/:id", deleteRequest);

export default router;
