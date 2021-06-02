import React from "react";
import axios from 'axios';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./theme.js";
import Navbar from "./components/Navbar/Navbar.js";

//Redux
//import { useDispatch } from "react-redux";

import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import ResultList from "./components/ResultList/ResultList.js";
import User from "./components/User/User.js";
import GroupForm from './components/Group/CreateGroup.js';

axios.defaults.baseURL = "https:/localhost:8082/api/";
axios.defaults.withCredentials = true;

const theme = createMuiTheme(themeFile);

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/results" component={ResultList} />
          <Route exact path="/user" component={User}/>
          <Route exact path="/group" component={GroupForm} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
