import React, {useState} from 'react';

import { useDispatch } from 'react-redux';

import {storage} from "../../firebase/index.js";

//import { uploadFile } from '../../redux/actions/authActions.js';


const FileUpload = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState();

    const handleChange = (event) => {

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const fileData = new FormData();
        fileData.append("MyUpload", file);

       //dispatch(uploadFile(file));
    }

    return (
        <div>
            
        </div>
    )
}

export default FileUpload
