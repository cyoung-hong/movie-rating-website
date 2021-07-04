import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CustomTile from "./CustomTile.js";

const useStyles = makeStyles((theme) => ({
  tileWrapper: {},
  gridContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  tile: {
    height: 200,
    width: 100,
  },
}));

const CustomGrid = ({ list }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.gridWrapper} item xs={12}>
      <Grid className={classes.gridContainer} spacing={1} container>
        {list.length > 0 ? (
          list.map((rec) => (
            <Grid className={classes.tileWrapper} key={rec.id} item>
              <CustomTile className={classes.tile} rec={rec} />
            </Grid>
          ))
        ) : (
          <Grid className={classes.tileWrapper} item>
            <Typography> No items in list.</Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default CustomGrid;
