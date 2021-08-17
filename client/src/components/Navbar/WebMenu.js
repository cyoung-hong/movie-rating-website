import React from "react";
import { useDispatch } from "react-redux";
import { NavLink as Link, useHistory } from "react-router-dom";
import { signOut } from "../../redux/actions/authActions.js";

//MUI
import { Typography, Grid, Button } from "@material-ui/core";

import useStyles from "./styles";

const WebMenu = (...{props}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const {user, loggedIn} = props || {};

  const handleClick = () => {
    dispatch(signOut());
    history.push("/");
  };

  return (
    <Grid container className={classes.subMenu} spacing={2} alignItems="center">
      {loggedIn ? (
        <>
          <Grid item>
            <Typography
              component={Link}
              to={"/group"}
              variant="body1"
              color="textSecondary"
            >
              Group
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              component={Link}
              to={"/user"}
              className={classes.userName}
              variant="body1"
              color="textSecondary"
            >
              {user.username}
            </Typography>
          </Grid>

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
        </>
      ) : (
        <Grid item>
          <Button component={Link} to={"/auth"}>
            <Typography color="textSecondary">Sign In</Typography>
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default WebMenu;
