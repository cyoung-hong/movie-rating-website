import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  Paper,
  Container,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { useDispatch, useSelector } from "react-redux";
import LockOutlined from "@material-ui/icons/LockOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";

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

const signupSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  email: Yup.string().required("Required").email(),
  password: Yup.string().required("Password required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const signinSchema = Yup.object({
  email: Yup.string().required("Required").email(),
  password: Yup.string().required("Password required"),
});

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const apiErrors = useSelector((state) => state.ui.errors);

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values) => {
    if (apiErrors) {
      console.log(apiErrors[0]);
    }
    if (isSignup) {
      dispatch(signup(values, history));
    } else {
      dispatch(signin(values, history)).then(() => {
        history.push("/");
      });
    }
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: initialFormData,
    validationSchema: isSignup ? signupSchema : signinSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container className={classes.theatre} maxWidth="false" disableGutters>
      <Container maxWidth="xs" position="relative">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      InputLabelProps={{ style: { color: "#000000" } }}
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      InputLabelProps={{ style: { color: "#000000" } }}
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      id="username"
                      name="username"
                      label="Username"
                      InputLabelProps={{ style: { color: "#000000" } }}
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.username && formik.errors.username
                      }
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="email"
                  name="email"
                  label="Email"
                  InputLabelProps={{ style: { color: "#000000" } }}
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  color="text"
                  variant="outlined"
                  id="password"
                  name="password"
                  label="Password"
                  InputLabelProps={{ style: { color: "#000000" } }}
                  onChange={formik.handleChange}
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                          {!showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {isSignup && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    InputLabelProps={{ style: { color: "#000000" } }}
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />
                </Grid>
              )}

              {apiErrors && (
                <Grid item xs={12}>
                  {apiErrors.map((item, index) => (
                    <Typography key={index} color="secondary">
                      {item.msg}
                    </Typography>
                  ))}
                </Grid>
              )}
            </Grid>

            <Button
              fullWidth
              variant="contained"
              className={classes.submit}
              type="submit"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>

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
