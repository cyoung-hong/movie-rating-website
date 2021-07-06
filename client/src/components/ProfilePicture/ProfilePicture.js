import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  profilePicture: {
    backgroundImage: (props) => `url(${props.backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "50px",
    height: (props) => props.height,
  },
}));

const ProfilePicture = (props) => {
  const classes = useStyles(props);
  return <Grid className={classes.profilePicture} xs={12} item />;
};

export default ProfilePicture;
