import React from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { useMediaQuery } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider, responsiveFontSizes } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./theme.js";
import Navbar from "./components/Navbar/Navbar.js";

//Redux
import { useDispatch } from "react-redux";

// Components
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import ResultList from "./components/ResultList/ResultList.js";
import User from "./components/User/User.js";
import GroupForm from "./components/Group/CreateGroup.js";
import Group from "./components/Group/Group.js";
import Footer from "./components/Footer/Footer.js";

import { useIdleTimer } from "react-idle-timer";

import {authenticate} from './redux/actions/authActions.js';
import FileUpload from "./components/Form/FileUpload.js";

axios.defaults.baseURL = "https:/localhost:8082/api/";
axios.defaults.withCredentials = true;

let theme = createMuiTheme(themeFile);
theme = responsiveFontSizes(theme); 

const App = () => {
  const dispatch = useDispatch();

  const handleOnIdle = (event) => {
    dispatch(authenticate());
  };

  const handleOnActive = (event) => {
    dispatch(authenticate());
  };

  // When user is logged in timeout is short, when user is logged out no timer or timer is long
  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 2,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
  });

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/results" component={ResultList} />
          <Route exact path="/user" component={User} />
          <Route exact path="/group" component={Group} />
          <Route exact path="/group/create" component={GroupForm} />
          <Route exact path="/test" component={FileUpload}/>
        </Switch>
        <Footer />
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
