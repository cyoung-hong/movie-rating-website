import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  Paper,
  Container,
  Grid,
} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import LockOutlined from '@material-ui/icons/LockOutlined';

import Icon from './Icon.js';
import Input from './Input.js';
import useStyles from './styles';

//REDUX
import { signin, signup } from '../../redux/actions/authActions.js';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const switchMode = () => {
    console.log('Is signup, ====== ' + isSignup);
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleShowPassword = () => {
    console.log('Is signup, ====== ' + isSignup);
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj; // will not throw an error if the account does not exist
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      history.push('/user');
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
    console.log('Google Sign In was unsuccessful. Try again later');
  };

  return (
    <Container className={classes.theatre} maxWidth='false' disableGutters>
      <Container maxWidth='xs' position='relative'>
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name='firstName'
                    label='First Name'
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name='lastName'
                    label='Last Name'
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name='email'
                label='Email Address'
                handleChange={handleChange}
                type='email'
              />
              <Input
                name='password'
                label='Password'
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name='confirmPassword'
                  label='Repeat password'
                  handleChange={handleChange}
                  type='password'
                />
              )}
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              className={classes.submit}
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
            <GoogleLogin
              clientId='1050871160315-68eql4v8bjj23q4p9c9347cbifnnoqdf.apps.googleusercontent.com'
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disable}
                  startIcon={<Icon />}
                  variant='contained'
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy='single_host_origin'
            />
            <Grid container justify='flex-end'>
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? 'Already have an account? Sign In'
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Container>
  );
};

export default Auth;
