import express from "express";
import { getRequest, getRequests, createRequest } from "../controllers/requestController.js";
import Request from "../models/Request.js";

import passport from "../middleware/Passport/setup.js";
import auth from "../middleware/Passport/auth.js";

const router = express.Router();

router.get("/", getRequests);
router.post("/create", createRequest);

export default router;
