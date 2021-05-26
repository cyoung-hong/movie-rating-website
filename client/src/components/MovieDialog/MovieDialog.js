import React from "react";
import { Dialog, Grid, Typography, useMediaQuery, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createRequest } from "../../redux/actions/recActions.js";
import moment from "moment";

import useStyles from "./styles";

const MovieDialog = (props) => {
  const { open, handleClose, movie } = props;
  const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const classes = useStyles({ posterPath });
  const dispatch = useDispatch();

  // Breakpoint for dialog directly
  const bigboi = useMediaQuery("(min-width:680px)");
  console.log(`is bigboi?${bigboi}`);

  const handleClick = (event) => {
    const movieData = {
      movie: {
        tmdbID: movie.id,
        title: movie.original_title,
        year: movie.release_date,
        posterUrl: movie.poster_path,
        //genres: result.genres,
      },
    };
  
    dispatch(createRequest(movieData));
  };

  return (
    <Dialog className={classes.dialog} open={open} onClose={handleClose}>
      <Grid container>
        <Grid className={classes.poster} item xs={4} />

        <Grid container className={classes.wrapper} xs={8}>
          <Grid item>
            <Grid container className={classes.info}>
              <Grid item className={classes.infoDetails}>
                <Typography variant="h6">{movie.title}</Typography>
              </Grid>
              <Grid item className={classes.infoDetails}>
                <Typography>
                  {moment(movie.release_date).format("MMMM D, YYYY")}
                </Typography>
              </Grid>
              <Grid item className={classes.infoDetails}>
                <Typography variant="body1">{movie.overview}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.buttonWrapper}>
            <Grid container className={classes.buttonContainer}>
              <Button
                className={classes.button}
                onClick={handleClick}
                variant="outlined"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default MovieDialog;
