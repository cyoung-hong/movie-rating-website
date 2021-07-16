import { GET_ALL_GROUPS, ADD_GROUP } from "../actionTypes.js";

const initialData = {
  groups: [],
};

const groupReducer = (state = initialData, action) => {
  switch (action.type) {
    case GET_ALL_GROUPS:
      console.log(action.data);
      return {
        ...state,
        groups: action.payload,
      };
    case ADD_GROUP: 
    return {
        ...state,
        groups: [...state.groups, action.payload]
    };
    default:
      return state;
  }
};

export default groupReducer;
