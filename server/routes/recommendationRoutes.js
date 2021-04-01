import express from 'express';

import { getRecommendations, createRecommendation } from '../controllers/recommendationController.js';

const router = express.Router();

router.get('/', getRecommendations);
router.post('/create', createRecommendation);


export default router;