import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import testImage from "../../images/agtown5years.jpg";

const useStyles = makeStyles((theme) => ({
  infoContainer: {
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  userPic: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  userInfo: {},
}));

const UserInfo = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.infoContainer} container xs={12}>
      <Grid
        className={classes.userPic}
        component="img"
        src={testImage}
        alt="user picture"
        item
      ></Grid>
      <Grid className={classes.userInfo} item>
        <Typography variant='h5'>username</Typography>
      </Grid>
      <Grid className={classes.userInfo} item>
        title
      </Grid>
      <Grid className={classes.userInfo} item>
        location
      </Grid>
    </Grid>
  );
};

export default UserInfo;
