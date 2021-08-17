import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(0.5),
    backgroundColor: "#000",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100vw",
  },
  disclaimer: {
    width: "100vw",

  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.footer}>
      <Typography className={classes.disclaimer} color="textSecondary" variant="h6">
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </Typography>
    </Grid>
  );
};

export default Footer;
