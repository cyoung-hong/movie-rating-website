import { AUTH, SEARCH_TMDB_TITLE } from '../actionTypes.js';
import * as api from "../../api/index.js";

export const signin = (formData, history) => async(dispatch) => {
    try {

        //log in user
        history.push('/');
    } catch(error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async(dispatch) => {
    try {
        // data = ({result: {} , token}) where result = new user
        const {data} = await api.signUp(formData);

        dispatch({type: AUTH, payload: data});
    } catch (err) {
        console.log("authActions caught error");
        console.log("Message?: " + err.message.message);
    }
}