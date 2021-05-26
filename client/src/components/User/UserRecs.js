import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  groupContainer: {
    maxHeight: "inherit",
    display: 'flex',
    height: "100%",
  },
  recPaper: {
    maxHeight: "inherit",
    width: "100%",
    padding: theme.spacing(1),
  },
  paperContainer: {
    maxHeight: "inherit",
  },
  recWrapper: {
    maxHeight: "inherit",
    display: 'flex',
    width: "100%",
  },
  recContainer: {
    maxHeight: "inherit",
    flexDirection: "column",
  },
  recommendations: {},
}));

const GroupRecs = () => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.groupContainer} container>
        <Grid className={classes.groupInfo} item xs={12}>
          <Grid item>
            <Typography variant="h5">Group Name</Typography>
          </Grid>
        </Grid>

        <Grid className={classes.recWrapper} item>
          <Grid className={classes.recContainer} container>
            <Grid className={classes.reccomendations} item>
              Rec 1
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 2
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 3
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 4
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 5
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 6
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 7
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 8
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 9
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 10
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 11
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 12
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 13
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 14
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 15
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 16
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 17
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 18
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 19
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 20
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 21
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 22
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 23
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 24
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 25
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 26
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 27
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 28
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 29
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 30
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 31
            </Grid>
            <Grid className={classes.reccomendations} item>
              Rec 32
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default GroupRecs;

// const useStyles = makeStyles((theme) => ({
//   groupContainer: {
//     maxHeight: "inherit",
//   },
//   recPaper: {
//     maxHeight: "inherit",
//     width: "100%",
//   },
//   paperContainer: {
//     maxHeight: "inherit",
//     flexDirection: "column",
//     padding: theme.spacing(1),
//   },
//   recWrapper: {
//     maxHeight: "inherit",
//   },
//   recContainer: {
//     maxHeight: "inherit",
//     paddingBottom: 10,
//     flexDirection: "column",
//     flexWrap: "wrap",
//   },
//   recommendations: {

//   },
// }));
