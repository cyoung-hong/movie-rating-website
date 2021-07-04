import {CREATE_GROUP} from "../actionTypes.js";

const initialData = {
    groupName: null,
    groupPhoto: null,
    members: [],
    groupRecs: []
};

const groupReducer = (state = initialData, action) => {
    switch(action.type){
        case CREATE_GROUP: 
        default:
            return state;
    }
}

export default groupReducer;