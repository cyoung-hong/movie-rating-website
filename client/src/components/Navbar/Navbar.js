import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

//MUI
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Button,
} from "@material-ui/core";

import useStyles from "./styles";

//Icons
import HomeIcon from "@material-ui/icons/Home";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(null);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser('');
  };

  const userName = useSelector((state) => state.authReducer.authData.name);

  useEffect(() => {
    //const token = user?.token;
    
    // JWT...
    setUser(userName);
    console.log(user);
    //setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton component={Link} to={"/"}>
          <HomeIcon />
        </IconButton>
        <Grid container className={classes.menuContainer}>
          <Grid container className={classes.subMenu}>
            <Grid item>
              <Button component={Link} to={"/recommend"}>
                <Typography>Recommend</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button component={Link} to={"/review"}>
                <Typography textDecoration="none">Review</Typography>
              </Button>
            </Grid>
          </Grid>
          {user !== '' ? (
            <Grid container className={classes.subMenu} spacing={2} alignItems="center">
              <Typography className={classes.userName} variant="h6">
                {user}
              </Typography>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.logout}
                  color="secondary"
                  onClick={logout}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item>
              <Button component={Link} to={"/auth"}>
                <Typography>Sign In</Typography>
              </Button>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
