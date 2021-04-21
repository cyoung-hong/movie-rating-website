import React from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core";
import { Grid, CircularProgress, CssBaseline } from "@material-ui/core";

import ResultDetail from "./ResultDetail/ResultDetail.js";

const useStyles = makeStyles((theme) => ({
  resultContainer: {
    position: "relative",
    top: 14,
    justifyContent: "center",
  },
}));

const ResultList = () => {
  const resultList = useSelector((state) => state.tmdbReducer.results);
  const classes = useStyles();

  return !resultList?.length ? (
    <React.Fragment>
      <CssBaseline />
      <CircularProgress />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <CssBaseline />
      <Grid container className={classes.resultContainer}>
        {resultList.map((result) => (
          <Grid key={result.id} item xs={8}>
            <ResultDetail result={result} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default ResultList;
