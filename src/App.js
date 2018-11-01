import React, { Component } from 'react';
import './css/App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "../src/pages/Main";
import Notice from "./pages/Notice";
import Message from "./pages/Message";
import Me from "./pages/Me";
import Login from "./pages/Login";
import PropTypes from "prop-types";
import Header from "./pages/Header";
class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <Switch>
              <Route exact={true} path={"/"} component={Main}/>
              <Route exact={false} path={"/notice"} component={Notice}/>
              <Route exact={false} path={"/message"} component={Message}/>
              <Route exact={false} path={"/me"} component={Me}/>
              <Route exact={false} path={"/login"} component={Login}/>

          </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
