import React, { useEffect, useState } from "react";
import { Grid, CssBaseline, Fragment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Components
import UserInfo from "./UserInfo.js";
import UserRecs from "./UserRecs.js";
import RecDetails from "../Recommendations/RecDetail/RecDetail.js";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { getMyRecs } from "../../redux/actions/recActions.js";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    padding: theme.spacing(4),
  },
  profileWrapper: {
    display: "flex",
    maxHeight: "50vh",
  },
  profileContainer: {
    maxHeight: "inherit",
  },
  infoWrapper: {
    maxHeight: "inherit",
  },
  groupWrapper: {
    maxHeight: "inherit",
  },
  innerContainer: {
    height: "100%",
  },
  infoContainer: {
    height: "100%",
  },
  recWrapper: {
    maxHeight: "inherit",
  },
  recContainer: {
    maxHeight: "inherit",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  recommendations: {
    width: "flex",
  },
}));

const User = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const recList = useSelector((state) => state.recReducer.myRecs);

  useEffect(() => {
    dispatch(getMyRecs());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <Grid className={classes.mainContainer} container>
        <Grid className={classes.profileWrapper} item xs={12}>
          <Grid className={classes.profileContainer} container xs={12}>
            <Grid className={classes.infoWrapper} item xs={3}>
              <UserInfo />
            </Grid>

            <Grid className={classes.groupWrapper} item xs={9}>
              <UserRecs />
            </Grid>
          </Grid>
        </Grid>

        <Grid className={classes.groupWrapper} item xs={12}>
          <Grid className={classes.groupContainer} container>
            {recList.map((rec) => (
              <Grid item key={rec.id} xs={12}>
                {console.log(rec)}
                <RecDetails rec={rec} />
              </Grid>
            ))}
            <Grid className={classes.groupRecs}>Group 1</Grid>
            <Grid className={classes.groupRecs}>Group 2</Grid>
            <Grid className={classes.groupRecs}>Group 3</Grid>
            <Grid className={classes.groupRecs}>Group 4</Grid>
            <Grid className={classes.groupRecs}>Group 5</Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default User;
