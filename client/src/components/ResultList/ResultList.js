import React from "react";
import { useSelector } from "react-redux";

import {
  Grid,
  CircularProgress,
  CssBaseline,
  makeStyles,
} from "@material-ui/core";

import ResultDetail from "./ResultDetail/ResultDetail.js";
import SearchBar from "../Search/SearchBar.js";

const useStyles = makeStyles((theme) => ({
  columnWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignContent: "flex-start",
    top: 0,
    left: 0,
    minHeight: "100vh",
    paddingTop: theme.spacing(12),
    padding: theme.spacing(8),
    background:
      "radial-gradient(circle, rgba(124,247,251,1) 0%, rgba(9,9,121,1) 100%)",
  },
  searchDetails: {
    position: "relative",
    background: "#ffffff80",
  },
  resultContainer: {
    justifyContent: "center",
  },
  search: {
    height: "fit-content",

  },
}));

// const array = [
//   {
//     title: "Movies",
//     count: 12,
//   },
//   {
//     title: "TV Shows",
//     count: 4,
//   },
//   {
//     title: "Companies",
//     count: 5,
//   },
//   {
//     title: "Keywords",
//     count: 45,
//   },
//   {
//     title: "Collections",
//     count: 45,
//   },
//   {
//     title: "Networks",
//     count: 0,
//   },
// ];

const ResultList = () => {
  const resultList = useSelector((state) => state.tmdb.results);
  const classes = useStyles();

  return !resultList?.length ? (
    <React.Fragment>
      <CssBaseline />
      <CircularProgress />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <CssBaseline />
      <Grid className={classes.columnWrapper} container xs={12} spacing={2}>
        <Grid className={classes.search} item xs={10}>
          <SearchBar />
        </Grid>
        <Grid item xs={10}>
          <Grid container className={classes.resultContainer} spacing={1}>
            {resultList.map((result) => (
              <Grid item key={result.id} xs={12}>
                <ResultDetail result={result} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ResultList;
