import express from "express";

import {
  createInquiry,
  deleteInquiryById,
} from "../controllers/groupInquiryController.js";

const router = express.Router();

//app.use("/api/groupInquiry", groupInquiryRoutes);
router.post("/create", createInquiry);
router.delete("/delete", deleteInquiryById);

export default router;
