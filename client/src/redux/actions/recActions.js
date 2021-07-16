import * as api from "../../api/index.js";
import {GET_RECOMMENDATIONS, GET_MY_RECOMMENDATIONS } from '../actionTypes.js';

export const getRecommendations = () => async (dispatch) => {
  try {
    const { data } = await api.getRecommendations();

    dispatch({ type: GET_RECOMMENDATIONS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getMyRecs = () => async (dispatch) => {
  try{ 
    const {data} = await api.getMyRecs();

    if(data) {
      dispatch({type: GET_MY_RECOMMENDATIONS, payload: data});
    }
  } catch (error) { 
    if(error.message === 'Request failed with status code 401') {
      console.log('Please login');
      
    }
    console.log(error.message);
  }
}

// export const getMyGroupRecommendations = () => async (dispatch) => {
//   try {
//     const {data} = await api.

//   } catch (error) {
//     if(error.message === 'Request failed with status code 401') {
//       console.log('Please login');
//     }
//     console.log(error.message);
//   }
// }

// export const getRecByUser = () => async (dispatch) => {
//   try{ 
//     const {data} = await api.getRecByUser();

//   } catch (error) { 
//     console.log(error.message);
//   }
// }

// TODO createRequest functionality
export const createRequest = (rec) => async (dispatch) => {
  try {
    const result = await api.createRec(rec);
    console.log(result);

    if(result) {
      alert(`${result.data.savedRec.movie.title} succesfully added!`);
    } 

  } catch (error) {
    console.log(error.response);
    console.log(error.response.data);
  }
};
