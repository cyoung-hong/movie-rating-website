import { SEARCH_MOVIE } from "../actionTypes.js";
import axios from "axios";

export const testAction = (query) => {
    console.log("In test action " + query);
}

export const searchMovie = (movieTitle) => (dispatch) => {
  //dispatch({ type: SEARCH_MOVIE });
  console.log("Firing searchMovie action ===================================")
//   axios
//     .get(`/search/${movieTitle}`)
//     .then((res) => {
//       dispatch({
//         type: SEARCH_MOVIE,
//         payload: res.data,
//       });
//     })
//     .catch((err) => console.log(err));
};
