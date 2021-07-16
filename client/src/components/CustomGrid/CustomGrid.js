import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CustomTile from "./CustomTile.js";
import GroupCard from "../Group/GroupCard.js";

// TODO INHERIT MAX WIDTHS AND SHIT

const useStyles = makeStyles((theme) => ({
  customGrid: {
    maxHeight: "inherit",
  },
  gridWrapper: {
    maxHeight: "inherit",
  },
  tileWrapper: {},
  movieCardWrapper: {
    maxHeight: "inherit",
  },
  gridContainer: {
    maxHeight: "inherit",
    flexGrow: 1,
    justifyContent: props => props.justifyContent,
  },
  tile: {
    height: 200,
    width: 100,
  },
}));

const CustomGrid = ({...props}) => {
  const {list, spacing, type} = props; 
  const classes = useStyles(props);

  return (
    <Grid className={classes.customGrid} container>
      <Grid className={classes.gridWrapper} item>
        <Grid className={classes.gridContainer} spacing={spacing} container>
          {list.length > 0 ? (
            list.map((l) => (
              type === "movie" ? 
              <Grid className={classes.tileWrapper} key={l.id} item>
                <CustomTile className={classes.tile} rec={l} />
              </Grid> :
              <Grid className={classes.movieCardWrapper} key={l.id} item xs={4}>
                <GroupCard group={l} />
              </Grid>
            ))
          ) : (
            <Grid className={classes.tileWrapper} item >
              <Typography> No items in list.</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomGrid;
