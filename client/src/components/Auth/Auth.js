import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Button, Paper, Container, Grid } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import LockOutlined from "@material-ui/icons/LockOutlined";

import Icon from "./Icon.js";
import Input from "./Input.js";
import useStyles from "./styles";

//REDUX
import { signin, signup } from "../../redux/actions/authActions.js";
import { getMyRecs } from "../../redux/actions/recActions.js";

const initialFormData = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const errors = useSelector((state) => state.uiReducer.errors);

  const getError = (field) => {
    let ret;

    if (errors) {
      errors.forEach((e) => {
        if (e.param === field) {
          ret = e.msg;
        }
      });
    }

    return ret;
  };

  const userErr = getError('username');
  const emailErr = getError('email');
  const passErr = getError('password');
  const confirmErr = getError('confirmPassword');


  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history)).then(() => dispatch(getMyRecs()));
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const switchMode = () => {
    console.log("Is signup, ====== " + isSignup);
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleShowPassword = () => {
    console.log("Is signup, ====== " + isSignup);
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj; // will not throw an error if the account does not exist
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/user");
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  return (
    <Container className={classes.theatre} maxWidth="false" disableGutters>
      <Container maxWidth="xs" position="relative">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                  <Input
                    name="username"
                    label="Username"
                    handleChange={handleChange}
                    errorExists={userErr !== undefined}
                    helperText={userErr !== undefined && userErr}
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
                errorExists={emailErr !== undefined}
                helperText={emailErr !== undefined && emailErr}
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                errorExists={passErr !== undefined}
                helperText={passErr !== undefined && passErr}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat password"
                  handleChange={handleChange}
                  type="password"
                  errorExists={confirmErr !== undefined}
                  helperText={confirmErr !== undefined && confirmErr}
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId="1050871160315-68eql4v8bjj23q4p9c9347cbifnnoqdf.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disable}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign In"
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
