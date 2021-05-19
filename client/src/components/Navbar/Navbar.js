import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logOut } from "../../redux/actions/authActions.js";

//MUI
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";

import useStyles from "./styles";


const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const authData = useSelector((state) => state.authReducer.authData);

  const [user, setUser] = useState("");

  const handleClick = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    setUser(authData.user);
  }, [authData]);

  return (
    <AppBar position="sticky" color="transparent">
      <Toolbar className={classes.navbar}>
        <Grid container className={classes.menuContainer}>
          <Grid item>
            <Typography component={Link} to={"/"} color="textSecondary" className={classes.homeLink}>AGTOWN MOVIES</Typography>
          </Grid>

          {user ? (
            <Grid
              container
              className={classes.subMenu}
              spacing={2}
              alignItems="center"
            >
              <Typography className={classes.userName} variant="body1" color="textSecondary">
                {user.username}
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
