import React, { useEffect, useState } from "react";
import { Grid, CssBaseline, Fragment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Components
import UserInfo from "./UserInfo.js";
import UserRecs from "./UserRecs/UserRecs.js";
import RecDetails from "../Recommendations/RecDetail/RecDetail.js";
import PosterGrid from "./UserRecs/PosterGrid.js";
import CustomGrid from "./UserRecs/CutomGrid.js";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { getMyRecs } from "../../redux/actions/recActions.js";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: "absolute",
    justifyContent: "center",
    alignContent: "flex-start",
    top: 0,
    left: 0,
    flexGrow: 1,
    minHeight: "100vh",
    paddingTop: theme.spacing(12),
    padding: theme.spacing(8),
    background:
      "radial-gradient(circle, rgba(124,247,251,1) 0%, rgba(9,9,121,1) 100%)",
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

  useEffect(() => {
    dispatch(getMyRecs());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <Grid className={classes.mainContainer} container>
        <CustomGrid />
      </Grid>
    </>
  );
};

export default User;
