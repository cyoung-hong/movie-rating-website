import { SEARCH_TMDB_TITLE } from "../actionTypes.js";

const initialState = {
};

const tmdbReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TMDB_TITLE:
      //console.log("Inside tmdb reducer");
      return action.payload;
    default:
      return state;
  }
};

export default tmdbReducer;
