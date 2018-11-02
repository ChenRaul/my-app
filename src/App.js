import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "../src/pages/Main";
import Notice from "./pages/Notice";
import Message from "./pages/Message";
import Me from "./pages/Me";
import Login from "./pages/Login";
import './css/App.css';
class App extends Component {

  render() {
    return (
      <BrowserRouter>
          {/*<Switch>标签，则其中的<Route>在路径相同的情况下，只匹配第一个，这个可以避免重复匹配*/}
          <Switch>
              {/*exact为true表示精确匹配，只有path完全相同才会跳转到该页面*/}
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
