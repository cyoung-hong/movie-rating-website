import React from "react";
import axios from 'axios';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Typography } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./theme.js";
import Navbar from "./components/Navbar/Navbar.js";

//Redux
//import { useDispatch } from "react-redux";

import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import Results from "./components/Results/Results.js";

axios.defaults.baseURL = "https:/localhost:8082/api/";

const theme = createMuiTheme(themeFile);

const App = () => {
  //const classes = useStyle();
  //const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch();
  // }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/results" component={Results} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
