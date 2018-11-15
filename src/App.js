import React, { Component } from 'react';
import {Router, Route, Switch} from "react-router-dom";
import Main from "../src/pages/Main";
import Notice from "./pages/Notice";
import Message from "./pages/Message";
import Me from "./pages/Me";
import Login from "./pages/Login";
import './css/App.css';
import {connect} from "react-redux";
import createBrowserHistory from 'history/createBrowserHistory'
import Detail from "./pages/Detail";

const history = createBrowserHistory();
class App extends Component {

  render() {
      // console.log('----');
      // console.log(this.HexString2Bytes('1234'))
    return (
        //     在路由列表的最外面添加<Router  history={history}>  </Router>，
        // 这样页面中就能直接通过this.props来调用history控制路由跳转
        <Router  history={history}>
             {/*<Switch>标签，则其中的<Route>在路径相同的情况下，只匹配第一个，这个可以避免重复匹配*/}
             <Switch>
                 {/*exact为true表示精确匹配，只有path完全相同才会跳转到该页面，然后停止寻找其它path
                    所以一般这些route的顺序需要考虑下
                 */}
                 <Route exact={true} path={"/"} component={Main}/>
                 <Route exact={false} path={"/notice"} component={Notice}/>
                 <Route exact={false} path={"/message"} component={Message}/>
                 <Route exact={false} path={"/me"} component={Me}/>
                 <Route exact={false} path={"/login"} component={Login}/>
                {/*//详情页面需要每个列表item的id，通过此方法传递id过去*/}
                 <Route exact={false} path={"/detail/:id"} component={Detail}/>

             </Switch>
         </Router>
    );
  }
     HexString2Bytes(str) {
        var pos = 0;
        var len = str.length;
        // if (len % 2 != 0) {
        //     return null;
        // }
        len /= 2;
         console.log(len)
        var arrBytes = new Array();
        for (var i = 0; i < len; i++) {
            var s = str.substr(pos, 2);
            var v = parseInt(s, 16);
            arrBytes.push(v);
            pos += 2;
        }
        return arrBytes;
    }

    Bytes2Str(arr)

    {

        var str = "";

        for(var i=0; i<arr.length; i++)

        {

            var tmp = arr[i].toString(16);

            if(tmp.length == 1)

            {

                tmp = "0" + tmp;

            }

            str += tmp;

        }

        return str;

    }
}

export default connect()(App);
