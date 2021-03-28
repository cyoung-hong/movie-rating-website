import { combineReducers } from 'redux';

import ratingReducer from './ratingReducer.js';
import authReducer from './authReducer.js';
import tmdbReducer from './tmdbReducer.js';

export default combineReducers({
    ratingReducer,
    authReducer,
    tmdbReducer,
});