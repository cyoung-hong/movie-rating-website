import express from 'express';
import { getRequest, createRequest } from '../controllers/requestController.js';

const router = express.Router();

router.get('/', getRequest);
router.post('/create', createRequest);

export default router;