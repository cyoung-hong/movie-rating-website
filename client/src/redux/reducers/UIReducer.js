import { SET_ERRORS, CLEAR_ERRORS } from "../actionTypes.js";

const initialState = {};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    case CLEAR_ERRORS:
      return initialState;
    default:
      return state;
  }
};

export default uiReducer;
