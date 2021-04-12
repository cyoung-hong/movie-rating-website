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
    console.log("Step 3: In createRequest action with request data.");
    console.log(request);
    await api.createRequest(request);
    
    //console.log(data);
    // If successful, redirect somewhere
    // If unsuccessful, to be determined
  } catch (error) {
    console.log(error.message);
  }
};
