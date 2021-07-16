import React, {useState} from 'react';

//import { useDispatch } from 'react-redux';

import {imagesRef} from "../../firebase/index.js";

//import { uploadFile } from '../../redux/actions/authActions.js';


const FileUpload = ({...props}) => {
    //const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [user, setUser] = useState('testUser');
    const [url, setUrl] = useState();

    const handleChange = (event) => {
        if(event.target.files[0]) {
            setFile(event.target.files[0])
        }
    }

    const handleSubmit = (event) => {
        const uploadTask = imagesRef.child(`${user}/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                imagesRef.child(`${user}`)
                .child(file.name)
                .getDownloadURL()
                .then(url => {
                    setUrl(url);
                })
            }
        )
    }

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
            <img src={url} alt='file preview'/>
        </div>
    )
}

export default FileUpload
