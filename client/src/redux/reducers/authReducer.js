import { AUTH, USER_SIGNUP, LOGOUT } from "../actionTypes.js";

const initialData = {
  authData: '',
};

const authReducer = (state = initialData, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        authData: {
          name: action?.data,
        },
      };
    case "SET_ERROR":
      console.log("AUTH REDUCER ========= " + action.data.message);
      return { ...state, test: action.data };
    case USER_SIGNUP:
      //localStorage.setItem("profile", action.data);
      console.log(action);
      return { ...state, authData: action?.data};
    case LOGOUT:
      return { ...state, authData: '' };
    default:
      return state;
  }
};

export default authReducer;
