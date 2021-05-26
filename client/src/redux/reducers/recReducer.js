import { GET_RECOMMENDATIONS, GET_MY_RECS } from "../actionTypes.js";

const initialState = {
  allRecs: [{}],
  myRecs: [{}],
};

const recReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECOMMENDATIONS:
      return state;
    case GET_MY_RECS:
      console.log(action);
      return {
        ...state,
        myRecs: action.payload
      }
    default:
      return state;
  }
};

export default recReducer;
