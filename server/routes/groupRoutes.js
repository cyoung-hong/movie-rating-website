import express from 'express';

import { getGroupById, createGroup } from '../controllers/groupController.js';

const router = express.Router();

router.get('/test/:id', getGroupById);
router.post('/create', createGroup);

export default router;