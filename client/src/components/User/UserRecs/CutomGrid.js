import React from "react";
import { Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CustomTile from "./CustomTile.js";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  tileWrapper: {

  },
  gridContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  tile: {
    height: 200,
    width: 100,
  }
}));


const CustomGrid = () => {
  const classes = useStyles();
  const recList = useSelector((state) => state.recReducer.myRecs);

  return (
    <Grid className={classes.gridWrapper} item xs={12}>
      <Grid className={classes.gridContainer} spacing={1} container>
        {recList.map((rec) => (
          <Grid className={classes.tileWrapper} item>
            <CustomTile className={classes.tile} rec={rec} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default CustomGrid;
