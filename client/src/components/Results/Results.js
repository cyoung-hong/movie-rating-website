import React from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core";
import { Grid, CircularProgress, CssBaseline } from "@material-ui/core";

import Result from "./Result/Result.js";

const useStyles = makeStyles((theme) => ({
  resultContainer: {
    position: "relative",
    top: 14,
    justifyContent: "center",
  },
}));

const Results = () => {
  const results = useSelector((state) => state.tmdbReducer.results);
  const classes = useStyles();

  return !results?.length ? (
    <React.Fragment>
      <CssBaseline />
      <CircularProgress />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <CssBaseline />
      <Grid container className={classes.resultContainer}>
        {results.map((result) => (
          <Grid key={result.id} item xs={8}>
            <Result result={result} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default Results;
