import { AUTH, LOGOUT, SET_ERRORS } from "../actionTypes.js";
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
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
  } catch (error) {
    const {errors} = error.response.data;
    console.log(errors);
    dispatch({type: SET_ERRORS, errors});
    //dispatch({type: 'SET_ERROR', errorObj});
  }
};

export const signOut = () => async (dispatch) => {
  try {
    const { data } = api.signOut();

    dispatch({ type: LOGOUT, payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const authenticate = () => async (dispatch) => {
  await api
    .authenticate()
    .then()
    .catch((error) => {
      if (!error.response.data.authenticated) dispatch({ type: LOGOUT });
    });
};
