import { SEARCH_MOVIE } from "../actionTypes.js";

const initialState = {
  filteredMovies: [],
  query: "",
};

const tmdbReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MOVIE:
      return {
        ...state,
        query: action.payload.query,
      };
    default:
      return state;
  }
};

export default tmdbReducer;
