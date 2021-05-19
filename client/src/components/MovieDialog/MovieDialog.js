import React from "react";
import { Dialog, Grid, Typography, useMediaQuery } from "@material-ui/core";
import moment from "moment";

import useStyles from "./styles";

const MovieModal = (props) => {
  const { open, handleClose, movieData } = props;
  const posterPath = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
  const classes = useStyles({ posterPath });

  const midget = useMediaQuery('min-width: 830px');
  console.log(midget);

  console.log(props);
  return (
    <Dialog className={classes.dialog} open={open} onClose={handleClose}>
      <Grid container>
        <Grid className={classes.poster} item xs={4} />

        <Grid item className={classes.wrapper} xs={8}>
          <Grid container className={classes.info}> 
            <Grid item className={classes.infoDetails}>
              <Typography variant="h6">{movieData.title}</Typography>
            </Grid>
            <Grid item className={classes.infoDetails}>
              <Typography>  {moment(movieData.release_date).format("MMMM D, YYYY")}</Typography>
            </Grid>
            <Grid item className={classes.infoDetails}>
              <Typography variant="body1">{movieData.overview}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default MovieModal;
