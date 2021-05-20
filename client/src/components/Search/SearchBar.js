import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  InputBase,
  IconButton,
} from "@material-ui/core";

import {useHistory} from 'react-router-dom';

import SearchIcon from "@material-ui/icons/Search";

import { searchMovieByTitle } from "../../redux/actions/tmdbActions.js";

import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    height: 30,
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
  const history = useHistory();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const handleChange = (event) => {
    //console.log({ [event.target.name]: event.target.value });
    setQuery(event.target.value.toString());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(query);
    const tmpPage = page.toString();
    
    // Goes to tmdbReducer after
    dispatch(searchMovieByTitle(query, tmpPage));
    history.push('/results');
  };
  

  return (
    <Paper
      component="form"
      className={classes.search}
      width={6}
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <InputBase
        className={classes.input}
        placeholder="Search TMDB"
        inputProps={{ "aria-label": "search tmdb" }}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        type="submit"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
