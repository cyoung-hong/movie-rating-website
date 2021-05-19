import * as api from "../../api/index.js";

export const getRequests = () => async (dispatch) => {
  try {
    const { data } = await api.getRequest();

    dispatch({ type: "GET_RECOMMENDATIONS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// TODO createRequest functionality
export const createRequest = (request) => async (dispatch) => {
  try {
    const result = await api.createRequest(request);
    if(result) {
      alert(`${result.data.savedReq.movie.title} succesfully added!`);
    } 

  } catch (error) {
    console.log(error.response);
    console.log(error.response.data);
  }
};
