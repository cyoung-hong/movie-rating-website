import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CustomGrid from "../User/UserRecs/CustomGrid.js";

import { useDispatch, useSelector } from "react-redux";

import ProfilePicture from "../ProfilePicture/ProfilePicture.js";

import pfp from "../../images/agtown5years.jpg";

const groupTest = {
  groupName: "Bank Busta",
  groupPhoto: "",
  members: [
    {
      photo: "",
    },
  ],
  recommendations: [
    {
      movie: {
        title: "Yah yah",
        year: 1990,
        runtime: 90,
      },
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: "absolute",
    justifyContent: "center",
    top: 0,
    left: 0,
    paddingTop: theme.spacing(9),
    flexGrow: 1,
    minHeight: "100vh",
    background:
      "radial-gradient(circle, rgba(124,247,251,1) 0%, rgba(9,9,121,1) 100%)",
  },
  groupContainer: {
    width: "90%",
  },
  groupInfo: {
    backgroundColor: "#00000080",
  },
  infoContainer: {
    width: "inherit",
  },
  profilePicture: {
    backgroundImage: `url(${pfp})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "200px",
    height: 150,
  },
  recommendationContainer: {
    backgroundColor: "#00000080",
  },
  recommendations: {
    width: "100%",
    height: "100vh",
  },
}));

const Group = () => {
  const classes = useStyles();

  const recList = useSelector(
    (state) => state.recommendations.myRecommendations
  );

  return (
    <Grid className={classes.mainContainer} container>
      <Grid className={classes.groupContainer} container spacing={2}>
        <Grid className={classes.groupInfo} item xs={3}>
          <Grid className={classes.infoContainer} container>
            <ProfilePicture backgroundImage={pfp} />

            <Grid className={classes.memberList} xs={12} item>
              MEMBERS LIST
            </Grid>
            <Grid className={classes.buttonGroup} xs={12} item>
              BUTTON GROUP
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={9}>
          <Grid
            className={classes.recommendationContainer}
            container
            spacing={2}
          >
            <Grid className={classes.recommendations} item>
              <CustomGrid list={recList} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Group;
