import React,{Component} from "react";
import {BrowserRouter, NavLink, Router} from "react-router-dom";
import Tab from "./Tab";
import Notice from "./Notice";


export default class Main extends Component{

    render(){
        return(
            <div className={'mainRoot'}>
                <div className={'mainContent'}>我是首页</div>
                <Tab/>
            </div>
        )
    }
}