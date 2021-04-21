import { AUTH, LOGOUT, SEARCH_TMDB_TITLE } from "../actionTypes.js";
import * as api from "../../api/index.js";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    //log in user
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    // data = ({result: {} , token}) where result = new user
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
  } catch (error) {
    console.log(error.response.data.message);
    //dispatch({type: 'SET_ERROR', errorObj});
    //console.log(error.message);
  }
};

export const logOut = async (dispatch) => {
  try{
    const {data} = api.logOut();
    console.log(data);
    dispatch({type: LOGOUT, data});
  } catch (error) {
    console.log(error.response);
  }
}