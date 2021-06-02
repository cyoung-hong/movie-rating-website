import React from 'react';
import {Button} from '@material-ui/core';
import {useFormikContext} from 'formik';

const SubmitButton = ({children, ...otherProps}) => {
    const {submitForm} = useFormikContext();

    const handleSubmit = () => {
        submitForm();
    }

    const configButton = { 
        ...otherProps,
        variant: 'constrained',
        color: 'primary',
        fullWidth: true,
        onClick: handleSubmit
    }

    return (
        <Button {...configButton}>{children}</Button>
    )
}

export default SubmitButton
