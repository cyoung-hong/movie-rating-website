import { CREATE_RECOMMENDATION } from '../actionTypes';
import * as api from '../../api/index.js';

export const getRecommendation = () => async (dispatch) => {

};


export const createRecommendation = (recommendation) => async (dispatch) => {
    try {
        const { data } = await api.createRecommendation(recommendation);
        console.log("Firing createRecommendation action ===================================")

        dispatch({ type: CREATE_RECOMMENDATION, payload: data});
    } catch (error) {
        console.log(error);
    }
};