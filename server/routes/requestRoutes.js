import express from 'express';
import { getRequest, createRequest } from '../controllers/requestController.js';

import passport from "../middleware/Passport/setup.js";
import auth from '../middleware/Passport/auth.js';

const router = express.Router();

router.get('/', getRequest);
router.post('/create', createRequest);

export default router;