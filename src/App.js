import React, { Component } from 'react';
import logo from './img/logo.svg';
import './css/App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "../src/pages/Main";
import Notice from "./pages/Notice";
import Message from "./pages/Message";
import Me from "./pages/Me";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
              <Route exact={true} path={"/"} component={Main}/>
              <Route exact={false} path={"/notice"} component={Notice}/>
              <Route exact={false} path={"/message"} component={Message}/>
              <Route exact={false} path={"/me"} component={Me}/>

          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
