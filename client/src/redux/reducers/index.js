import { combineReducers } from 'redux';

import ratingReducer from './ratingReducer.js';
import authReducer from './authReducer.js';

export default combineReducers({
    ratingReducer,
    authReducer
});