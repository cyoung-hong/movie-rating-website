import React from "react";
import {
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import { useDispatch } from 'react-redux';

import { Card, CardContent, CardMedia } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { createRecommendation } from '../../../redux/actions/recommendationActions.js';


//import useStyles from './styles';

// const handleClick = (event) => {

// }

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


const Result = ({result}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    //console.log(Date.now());
    const movieData = {
      movie: {
        tmdbID: result.id,
        title: result.original_title,
        year: result.release_date,
        posterUrl: result.poster_path,
        genres: result.genres,
      }
    };
    
    dispatch(createRecommendation(movieData));
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

export default Result;
