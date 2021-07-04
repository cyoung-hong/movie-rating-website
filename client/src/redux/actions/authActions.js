import { AUTH, LOGOUT, SET_ERRORS } from "../actionTypes.js";
import * as api from "../../api/index.js";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
  } catch (error) {
    const { errors } = error.response.data;
    console.log(errors);
    dispatch({ type: SET_ERRORS, errors });
  }
};

export const signOut = () => (dispatch) => {
  try {
    const { data } = api.signOut();
    dispatch({ type: LOGOUT, payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const authenticate = (history) => async (dispatch) => {
  console.log("Authenticating...");
  await api
    .authenticate()
    .then()
    .catch((error) => {
      if (!error.response.data.authenticated) {
        dispatch({ type: LOGOUT })
      }
    });
};
