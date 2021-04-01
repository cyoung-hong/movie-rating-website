import { SEARCH_TMDB_TITLE } from "../actionTypes.js";
import * as api from '../../api/index.js';

export const testAction = (query) => {
    console.log("In test action " + query);
}

export const searchMovieByTitle = (movieTitle, page) => async (dispatch) => {
  //dispatch({ type: SEARCH_MOVIE });
  console.log("Firing searchMovie action ===================================")
  try {
    const { data } = await api.queryTMDBTitle(movieTitle, page);

    // payload should be res.data.results
    dispatch({ type: SEARCH_TMDB_TITLE, payload: data});
  } catch (err) {
    console.log(`YIKES ${err}`);
  }
};
