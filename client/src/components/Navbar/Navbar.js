import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { signOut } from "../../redux/actions/authActions.js";

//MUI
import { AppBar, Toolbar, Typography, Grid, } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";

import useStyles from "./styles";

import WebMenu from './WebMenu.js';
import MobileMenu from './MobileMenu.js';

const Navbar = () => {
  const classes = useStyles();

  const user = useSelector((state) => state.auth.user);
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const matches = useMediaQuery("(max-width: 720)");
  console.log(matches);

  return (
    <AppBar position="sticky" color="transparent">
      <Toolbar className={classes.navbar}>
        <Grid container className={classes.menuContainer}>
          <Grid item>
            <Typography
              component={Link}
              to={"/"}
              color="textSecondary"
              className={classes.homeLink}
              variant="h6"
            >
              AGTOWN MOVIES
            </Typography>
          </Grid>
          <Grid className={classes.webMenu} item>
            <WebMenu user={user} loggedIn={loggedIn}/>
          </Grid>
          <Grid className={classes.mobileMenu} item>
            {/* Dropdown Menu */}
            <MobileMenu loggedIn={loggedIn}/>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
