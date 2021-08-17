import React, { useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

import { useDispatch, useSelector } from "react-redux";

import ProfilePicture from "../ProfilePicture/ProfilePicture.js";
import CustomGrid from "../CustomGrid/CustomGrid.js";
// import GroupCard from "./GroupCard.js";

import { getGroups } from "../../redux/actions/groupActions.js";

import pfp from "../../images/agtown5years.jpg";

// const groupTest = {
//   groupName: "Bank Busta",
//   groupPhoto: "",
//   members: [
//     {
//       photo: "",
//     },
//   ],
//   recommendations: [
//     {
//       movie: {
//         title: "Yah yah",
//         year: 1990,
//         runtime: 90,
//       },
//     },
//   ],
// };

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
  },  {
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
  },  {
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
  },  {
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
    height: "85vh",
    width: "70%",
    justifyContent: "center",
  },
  groupInfo: {
    backgroundColor: "#00000080",
    margin: "0px 8px",
    maxHeight: "100%",
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
    overflow: "scroll",
    '&::-webkit-scrollbar' :{
      width: '0',
      diplay: 'hidden',
    }
  },
  member: {
    margin: "4px 0px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  memberPic: {
    marginRight: "4px",
  },
  recommendationContainer: {
    height: "50vh",
    marginBottom: "8px",
    padding: theme.spacing(2),
    backgroundColor: "#00000080",
  },
  recommendations: {
    width: "100%",
    maxHeight: "100%",
    overflow: "scroll",
    '&::-webkit-scrollbar' :{
      width: '0',
      diplay: 'hidden',
    }
  },
  groupRecommendations: {
    margin: "0px 8px",
  },
  buttonGroup: {},
  button: {
    padding: 0,
  },
  groupsListContainer: {
    height: "35vh",
    maxHeight: "35vh",
    backgroundColor: "#00000080",
    padding: theme.spacing(2),
  },
  groupsList: {
    maxHeight: "inherit",
    maxWidth: "inherit",
    overflow: "scroll",
    '&::-webkit-scrollbar' :{
      width: '0',
      diplay: 'hidden',
    }
  },
}));

const Group = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const recList = useSelector(
    (state) => state.auth.user.activeGroup.groupRecommendations
  );

  const userRecs = useSelector(
    (state) => state.recommendations.myRecommendations
  );

  // Do i need to save in redux? If so, change group reducer slice blah blah
  const groupList = useSelector((state) => state.group.groups);
  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

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
                    <Grid item>{m.name}</Grid>
                    <Grid item>
                      <IconButton className={classes.button}>
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
            <Grid className={classes.recommendations} item xs={12}>
              {userRecs ? (
                <CustomGrid
                  className={{ padding: 0 }}
                  list={userRecs}
                  spacing={0}
                  type="movie"
                />
              ) : (
                <Grid item>Nothing here</Grid>
              )}
            </Grid>
          </Grid>

          <Grid className={classes.groupsListContainer} container xs={12}>
            <Grid className={classes.groupsList} item xs={12}>
              <CustomGrid list={groupList} spacing={0} type="group" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Group;
