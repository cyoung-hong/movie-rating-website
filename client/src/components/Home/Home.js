import React from "react";
import { Grid, Container, CssBaseline } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";

import SearchBar from "../Search/SearchBar.js";
import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.theatre} disableGutters maxWidth={false}>
        <Grid className={classes.overlay} />
        <Grid container className={classes.content}>
          <Grid item>
            <SearchBar />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Home;
