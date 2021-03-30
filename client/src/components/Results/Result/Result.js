import React from "react";
import { Paper, Grid, Button, Divider, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";

//import useStyles from './styles';

const useStyles = makeStyles((theme) => ({
  paper: {
      minWidth: "80%",
      maxHeight: 600,
  },
  wrappingContainer: {
      alignContent: "center",
      alignItems: "center",
  },
  moviePoster: {
    objectFit: "cover",
    maxWidth: "100%",
  },
  movieInfo: {},
}));

const Result = (result, setCurrentId) => {
  const classes = useStyles();
  console.log(result.result.original_title);
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3} className={classes.wrappingContainer}>
        <Grid item xs={2} className={classes.moviePoster}>
          <img
            src={`https://image.tmdb.org/t/p/w300${result.result.poster_path}`}
            alt="movie poster"
            className={classes.moviePoster}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6">{result.result.original_title} </Typography>
          <Typography>{result.result.overview}</Typography>
        </Grid>
        <Button className={classes.recButton}>
          Recommend
        </Button>
      </Grid>
    </Paper>
  );
};

export default Result;
