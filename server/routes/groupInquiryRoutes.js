import express from 'express';

import { createInquiry } from '../controllers/groupInquiryController.js';

const router = express.Router();

//app.use("/api/groupInquiry", groupInquiryRoutes);

router.post('/create', createInquiry);

export default router;