import { CREATE_GROUP, GET_ALL_GROUPS } from "../actionTypes.js";
import * as api from "../../api/index.js";

// Action Creator
export const getGroups = () => async (dispatch) => {
  try {
    const { data } = await api.getGroups();
    if (data) {
      dispatch({ type: GET_ALL_GROUPS, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createGroup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.createGroup(formData);
    dispatch({ type: CREATE_GROUP, data });
  } catch (error) {
    console.log(error);
  }
};
