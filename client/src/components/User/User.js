import React, { useEffect } from "react";
import { Grid, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Components
// import UserInfo from "./UserInfo.js";
// import UserRecs from "./UserRecs/UserRecs.js";
// import RecDetails from "../Recommendations/RecDetail/RecDetail.js";
// import PosterGrid from "./UserRecs/PosterGrid.js";
import CustomGrid from "../CustomGrid/CustomGrid.js";
// import Group from "../Group/Group.js";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getMyRecs,
} from "../../redux/actions/recActions.js";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: "absolute",
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
  groupList: {
    minHeight: 200,
  },
}));

const User = () => {
  const classes = useStyles();
  // const groupList = useSelector(
  //   (state) => state.recommendations.groupRecommendations
  // );
  const recList = useSelector(
    (state) => state.recommendations.myRecommendations
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyRecs());
    //dispatch(getGroupRecommendations());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <Grid className={classes.mainContainer} container justify="center">
        <Grid item>
          <CustomGrid list={recList} spacing={1} type="movie" />
        </Grid>
      </Grid>
    </>
  );
};

export default User;
