import { SEARCH_TMDB_TITLE } from "../actionTypes.js";

const initialState = {
  searchResults: [],
  page: "",
};

const tmdbReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TMDB_TITLE:
      //console.log("Inside tmdb reducer");
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};

export default tmdbReducer;
