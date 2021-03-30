import React from "react";
import { Grid, CircularProgress, CssBaseline } from "@material-ui/core";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core";

import Result from "./Result/Result.js";

const useStyles = makeStyles((theme) => ({
  resultContainer: {
    position: "relative",
    top: 14,
    justifyContent: "center",
  },
}));

const Results = ({ setCurrentId }) => {
  const results = useSelector((state) => state.tmdbReducer.results);
  const classes = useStyles();
  console.log(results.length);
  return !results?.length ? (
    <CircularProgress />
  ) : (
    <React.Fragment>
      <CssBaseline />
      <Grid
        container
        spacing={4}
        className={classes.resultContainer}
      >
        <Grid item xs={8}>
          {results.map((result) => (
            <Result result={result} setCurrentId={setCurrentId} />
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Results;
