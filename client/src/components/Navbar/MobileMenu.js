import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../redux/actions/authActions.js";

//MUI
import { Typography, Grid, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const MobileMenu = ({ ...props }) => {
  const { loggedIn } = props;
  console.log(props);
  return (
    <>
      {loggedIn ? (
        <MenuIcon style={{ fill: "#fff" }} />
      ) : (
        <Grid item>
          <Button component={Link} to={"/auth"}>
            <Typography variant="h6" color="textSecondary">Sign In</Typography>
          </Button>
        </Grid>
      )}
    </>
  );
};

export default MobileMenu;
