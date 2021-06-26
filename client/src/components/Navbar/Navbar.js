import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../../redux/actions/authActions.js";

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

  const user = useSelector((state) => state.authReducer.user);
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);

  const handleClick = () => {
   dispatch(signOut());
  };

  return (
    <AppBar position="sticky" color="transparent">
      <Toolbar className={classes.navbar}>
        <Grid container className={classes.menuContainer}>
          <Grid item>
            <Typography component={Link} to={"/"} color="textSecondary" className={classes.homeLink}>AGTOWN MOVIES</Typography>
          </Grid>

          {loggedIn? (
            <Grid
              container
              className={classes.subMenu}
              spacing={2}
              alignItems="center"
            >
              <Typography component={Link} to={"/user"} className={classes.userName} variant="body1" color="textSecondary">
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
