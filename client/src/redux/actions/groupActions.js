import {CREATE_GROUP} from "../actionTypes.js";
import * as api from "../../api/index.js";

export const createGroup = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.createGroup(formData);
        dispatch({type: CREATE_GROUP, data});

    } catch (error) {
        console.log(error);
    }
}