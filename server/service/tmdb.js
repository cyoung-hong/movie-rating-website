// TMDB ROUTES
import express from 'express';

import {testTMDB,searchMovie} from "./tmdbController.js";

const router = express.Router();

router.get('/', testTMDB);
router.get('/search/:query/:page', searchMovie);


export default router;