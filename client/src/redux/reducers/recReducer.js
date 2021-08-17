import { GET_RECOMMENDATIONS, GET_MY_RECOMMENDATIONS } from "../actionTypes.js";

const initialState = {
  allRecommendations: [],
  myRecommendations: [],
  groupRecommendations: [],
};

const recReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECOMMENDATIONS:
      return state;
    case GET_MY_RECOMMENDATIONS:
      console.log(action);
      return {
        ...state,
        myRecommendations: action.payload,
      };
    default:
      return state;
  }
};

export default recReducer;
