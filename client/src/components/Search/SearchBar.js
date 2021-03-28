import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  InputBase,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import axios from 'axios';

import {testAction,searchMovie} from "../../redux/actions/tmdbActions.js";

const key = "0204271af4a18c9dbc4c32fc858eff07";
const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}`;
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=the%20cleansing%20hour&page=1&include_adult=false

const useStyles = makeStyles((theme) => ({
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  test: {
    color: "#fc0303",
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    //console.log({ [event.target.name]: event.target.value });
    setQuery(event.target.value.toString());
    searchMovie(query);
  };

  return (
    <Paper component="form" className={classes.search} width={6} onChange={handleChange}>
      <InputBase
        className={classes.input}
        placeholder="Search TMDB"
        inputProps={{ "aria-label": "search tmdb" }}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
