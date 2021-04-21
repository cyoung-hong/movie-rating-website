import React from "react";
import {
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createRequest } from '../../../redux/actions/requestActions.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: 4,
    width: "100%",
    height: 141,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  content: {
    width: "100%",
    height: "100%"
  },
  cover: {
    display: "flex",
    width: 94,
  },
}));

const ResultDetail = ({result}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    console.log('Step 1: Creating movieData object');
    const movieData = {
      movie: {
        tmdbID: result.id,
        title: result.original_title,
        year: result.release_date,
        posterUrl: result.poster_path,
        //genres: result.genres,
      }
    };
    console.log('Step 2: Dispatch object');
    console.log(movieData);
    dispatch(createRequest(movieData));
  }
  
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={`https://image.tmdb.org/t/p/w300${result.poster_path}`}
        title="poster"
      />
      <Grid container className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {result.original_title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {result.overview}
          </Typography>
          <Button onClick={handleClick}> 
            Adddd
          </Button>
        </CardContent>
      </Grid>
    </Card>
  );
};

export default ResultDetail;
