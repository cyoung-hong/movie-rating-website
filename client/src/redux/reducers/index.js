import { combineReducers } from 'redux';

import ratingReducer from './ratingReducer.js';
import recReducer from './recReducer.js';
import authReducer from './authReducer.js';
import tmdbReducer from './tmdbReducer.js';
import uiReducer from './UIReducer.js';
import groupReducer from './groupReducer.js';

export default combineReducers({
    ratings: ratingReducer,
    tmdb: tmdbReducer,
    recommendations: recReducer,
    auth: authReducer,
    ui: uiReducer,
    group: groupReducer,
});