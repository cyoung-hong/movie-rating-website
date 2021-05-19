import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { logOut } from "../../redux/actions/authActions.js";

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

import SearchBar from "../Search/SearchBar.js";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const authData = useSelector((state) => state.authReducer.authData);

  const [user, setUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleClick = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    setUser(authData.user);
    setLoggedIn(true);
  }, [location]);

  return (
    <AppBar position="sticky" color="transparent">
      <Toolbar className={classes.navbar}>
        <Grid container className={classes.menuContainer}>
          <Grid item>
            <Typography component={Link} to={"/"} color="textSecondary" className={classes.homeLink}>AGTOWN MOVIES</Typography>
          </Grid>

          {authData.user ? (
            <Grid
              container
              className={classes.subMenu}
              spacing={2}
              alignItems="center"
            >
              <Typography className={classes.userName} variant="body1" color="textSecondary">
                {authData.user.username}
              </Typography>
              <Grid item className={classes.searchWrapper}>
                <Button
                  variant="contained"
                  className={classes.logout}
                  color="secondary"
                  onClick={handleClick}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item>
              <Button component={Link} to={"/auth"}>
                <Typography color="textSecondary">Sign In</Typography>
              </Button>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
