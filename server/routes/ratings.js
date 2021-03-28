import express from 'express';

import { getRatings, createRating } from '../controllers/ratingsController.js';

const router = express.Router();

router.get('/', getRatings);
router.post('/create', createRating);


export default router;