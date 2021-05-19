import React, { useEffect, useState } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Modal,
  Paper,
  Box,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createRequest } from "../../../redux/actions/requestActions.js";
import moment from "moment";

import MovieDialog from "../../MovieDialog/MovieDialog.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: 141,
  },
  cardHeader: {
    justifyContent: "space-between",
    alignContent: "center",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    display: "flex",
    minWidth: 94,
    width: 95,
    height: 141,
  },
  content: {
    height: "100%",
    alignContent: "space-between",
  },
  overviewWrapper: {
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  clickable: {
    cursor: "pointer",
    width: "100%",
  },
}));

const ResultDetail = ({ result }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    const movieData = {
      movie: {
        tmdbID: result.id,
        title: result.original_title,
        year: result.release_date,
        posterUrl: result.poster_path,
        //genres: result.genres,
      },
    };

    dispatch(createRequest(movieData));
  };

  // TO DO
  // Open paper with movie details
  // Modal currently fires both actions
  const openMovieModal = () => {
    console.log("In open" + open);
    setOpen(true);

    //dispatch(getMovieDetails(movieData))
  };

  const handleClose = () => {
    console.log("In Close" + open);
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.image}
        image={`https://image.tmdb.org/t/p/w300${result.poster_path}`}
        title="poster"
      />

      <CardContent className={classes.clickable} onClick={openMovieModal}>
        <Grid className={classes.content} container>
          <Grid item xs={12}>
            <Grid className={classes.cardHeader} container xs={12}>
              <Grid item>
                <Grid item className={classes.title}>
                  {result.title}
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {moment(result.year).format("MMMM D, YYYY")}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Button onClick={openMovieModal} variant="outlined">
                  More
                </Button>
                <Button onClick={handleClick} variant="outlined">
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container className={classes.overviewWrapper}>
              <Typography variant="body1" color="textPrimary">
                {result.overview}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <MovieDialog open={open} handleClose={handleClose} movieData={result} />
    </Card>
  );
};

export default ResultDetail;

{
  /*     <Card className={classes.root}>
      <CardMedia
        className={classes.image}
        image={`https://image.tmdb.org/t/p/w300${result.poster_path}`}
        title="poster"
      />
      <CardContent onClick={() => {alert("Hi")}}>
        <Grid className={classes.content} container>
          <Grid item xs={12} >
            <Grid className={classes.cardHeader} container xs={12}>
              <Grid item>
                <Grid item className={classes.title}>
                  {result.title}
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {moment(result.year).format("MMMM D, YYYY")}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Button onClick={handleClick} variant="outlined">Add</Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container className={classes.overviewWrapper}>
              <Typography variant="body1" color="textPrimary">
                {result.overview}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>*/
}

{
  /* <Card className={classes.root}>
<CardActionArea>
  <CardMedia
    className={classes.image}
    image={`https://image.tmdb.org/t/p/w300${result.poster_path}`}
    title="poster"
  />
  <CardContent
    onClick={() => {
      alert("Hi");
    }}
  >
    <Typography> {result.title} </Typography>

    <Typography variant="body1">
      {moment(result.year).format("MMMM D, YYYY")}
    </Typography>

    <Button onClick={handleClick} variant="outlined">
      Add
    </Button>

    <Typography variant="body1" color="textPrimary">
      {result.overview}
    </Typography>
  </CardContent>
</CardActionArea>
</Card> */
}
