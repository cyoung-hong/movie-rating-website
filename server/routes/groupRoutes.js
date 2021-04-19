import express from 'express';

import { getGroupById } from '../controllers/groupController.js';

const router = express.Router();

router.get('/test/:id', getGroupById);

export default router;