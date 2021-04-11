import { AUTH, USER_SIGNUP, LOGOUT } from "../actionTypes.js";

const initialData = {
  authData: {
    name: '',
  },
  test: {},
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
      localStorage.setItem("profile", action.data);
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
