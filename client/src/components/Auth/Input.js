import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import { useField } from "formik";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// INPUT PROPS GENERATES A WARNING

const Input = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  console.log(props);

  const configTextField = {
    ...field,
    ...props,
    // InputProps: name === "password" && {
    //   endAdornment: (
    //     <InputAdornment position="end">
    //       <IconButton onClick={props.handleShowPassword}>
    //         {props.type === "password" ? <Visibility /> : <VisibilityOff />}
    //       </IconButton>
    //     </InputAdornment>
    //   ),
    // },
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default Input;
