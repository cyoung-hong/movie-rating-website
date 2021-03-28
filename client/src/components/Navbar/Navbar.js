import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  console.log(user);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    // JWT...

    setUser(JSON.parse(localStorage.getItem("profile")));
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
          {user?.result ? (
            <Grid container className={classes.subMenu} spacing={2} alignItems="center">
              <Typography className={classes.userName} variant="h6">
                {user?.result.name}
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
