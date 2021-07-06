import React from "react";
import {
  Grid,
  Button,
  Avatar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

import { useDispatch, useSelector } from "react-redux";

import ProfilePicture from "../ProfilePicture/ProfilePicture.js";
import CustomGrid from "../User/UserRecs/CustomGrid.js";

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

const memberList = [
  {
    name: "Bob",
    pfp: pfp,
  },
  {
    name: "Rob",
    pfp: pfp,
  },
  {
    name: "Jobs",
    pfp: pfp,
  },
  {
    name: "Hob",
    pfp: pfp,
  },
  {
    name: "Nob",
    pfp: pfp,
  },
];

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
    height: "90vh",
    width: "90%",
    justifyContent: "center",
  },
  groupInfo: {
    backgroundColor: "#00000080",
    margin: "0px 8px",
  },
  infoContainer: {
    width: "inherit",
    height: "100%",
  },
  groupHeader: {
    width: "100%",
    height: "20%",
  },
  containerWrapper: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    padding: theme.spacing(2),
  },
  memberList: {
    height: "70%",
    padding: "0px 16px",
  },
  member: {
    margin: "4px 0px",
    alignItems: "center",
    justifyContent: "space-between"
  },
  memberPic: {
    marginRight: "4px",
  },
  recommendationContainer: {
    height: "90vh",
    // justifyContent: "center",
    // alignContent: "center",
    padding: theme.spacing(2),
    backgroundColor: "#00000080",
  },
  recommendations: {
    width: "100%",
  },
  groupRecommendations: {
    margin: "0px 8px",
  },
  buttonGroup: {},
  button: {
    padding: 0,
  },
}));

const Group = () => {
  const classes = useStyles();

  const recList = useSelector(
    (state) => state.recommendations.myRecommendations
  );

  return (
    <Grid className={classes.mainContainer} container>
      <Grid className={classes.groupContainer} container>
        <Grid className={classes.groupInfo} item xs={3}>
          <Grid className={classes.infoContainer} container>
            <Grid className={classes.groupHeader} item>
              <Grid className={classes.containerWrapper} container>
                <ProfilePicture backgroundImage={pfp} height="80%" />
                <Grid item xs={12}>
                  <Typography variant="h6">Group</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid className={classes.memberList} xs={12} item>
              {memberList.length > 0 &&
                memberList.map((m) => (
                  <Grid className={classes.member} key={m.id} container xs={12}>
                    <Grid item>
                      {m.name}
                    </Grid>
                    <Grid item>
                      <IconButton className={classes.button} > 
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
            </Grid>

            <Grid className={classes.buttonGroup} xs={12} item>
              <Grid justify="flex-end" alignItems="center" container xs={12}>
                <Button>Leave</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid className={classes.groupRecommendations} item xs={8}>
          <Grid className={classes.recommendationContainer} container>
            <Grid className={classes.recommendations} item>
              <CustomGrid className={{padding: 0}} list={recList} spacing={0}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Group;
