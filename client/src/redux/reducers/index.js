import { combineReducers } from 'redux';

import ratingReducer from './ratingReducer.js';
import recReducer from './recReducer.js';
import authReducer from './authReducer.js';
import tmdbReducer from './tmdbReducer.js';
import uiReducer from './UIReducer.js';

export default combineReducers({
    ratingReducer,
    tmdbReducer,
    recReducer,
    authReducer,
    uiReducer,
});