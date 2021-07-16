import { AUTH, USER_SIGNUP, LOGOUT } from "../actionTypes.js";

const initialData = {
  loggedIn: false,
  user: {
    _id: null,
    username: "",
    picturePath: "",
    activeGroup: {
      _id: null,
      groupName: "",
      members: [],
      groupRecommendations: [],
    },
  },
};

const authReducer = (state = initialData, action) => {
  switch (action.type) {
    case AUTH:
      console.log(action.data);
      return {
        ...state,
        user: {
          ...state.user,
          ...action.data.user,
        },
        loggedIn: true,
      };
    case "SET_ERROR":
      console.log("AUTH REDUCER ========= " + action.data.message);
      return { ...state, test: action.data };
    case USER_SIGNUP:
      //localStorage.setItem("profile", action.data);
      console.log(action);
      return { ...state, authData: action?.data };
    case LOGOUT:
      return {
        ...initialData,
      };
    default:
      return state;
  }
};

export default authReducer;
