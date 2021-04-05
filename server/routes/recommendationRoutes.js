import express from 'express';

import { getRecommendations, createRecommendation } from '../controllers/recommendationController.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getRecommendations);
router.post('/create', auth, createRecommendation);


export default router;