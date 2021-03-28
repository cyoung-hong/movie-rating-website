import { GET_RATINGS, LOADING_DATA } from '../actionTypes';
import api from '../../api/index.js';

export const getRatings = () => async (dispatch) => {
    try {
        dispatch({LOADING_DATA});
        console.log('===================================== In get ratings ======================================');
        const {data} = await api.fetchRatings();
        dispatch({ type: GET_RATINGS, payload: data});
    } catch (err) {
        console.log(err);
    }
};