import React from "react";
import { Modal, Dialog, Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import useStyles from "./styles";

const MovieModal = (props) => {
  const { open, handleClose, movieData } = props;
  const posterPath = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
  const classes = useStyles({ posterPath });

  console.log(props);
  return (
    <Dialog className={classes.dialog} open={open} onClose={handleClose}>
      <Grid container>
        <Grid className={classes.poster} item xs={4} />

        <Grid item className={classes.info} xs={8}>
          <Grid container className={classes.info}> 
            <Grid item alignContent="space-between">
              <Typography variant="h6">{movieData.title}</Typography>
            </Grid>
            <Grid item>
              <Typography>{movieData.release_date}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{movieData.overview}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default MovieModal;
