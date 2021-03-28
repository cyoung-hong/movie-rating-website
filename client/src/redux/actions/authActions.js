import { AUTH } from '../actionTypes.js';

export const signin = (formData, history) => async(dispatch) => {
    try {

        //log in user
        history.push('/');
    } catch(error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async(dispatch) => {
    
}