import * as api from '../../api/index.js';

export const getRequests = () => async (dispatch) => {
    try {
        const { data } = await api.getRecommendations();

        dispatch({ type: 'GET_RECOMMENDATIONS', payload: data,})
    } catch(error) {
        console.log(error.message);
    }
};

// TODO createRequest functionality
export const createRequest = (recommendation) => async (dispatch) => {
    try {
        const { data } = await api.createRecommendation(recommendation);
        // If successful, redirect somewhere
        // If unsuccessful, to be determined
    } catch (error) {
        console.log(error);
    }
};