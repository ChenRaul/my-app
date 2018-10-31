import React,{Component} from "react";
import {BrowserRouter, NavLink, Router} from "react-router-dom";
import Tab from "./Tab";


export default class Me extends Component{

    render(){
        return(
            <div className={'mainRoot'}>
                <div className={'mainContent'}>我是个人中心</div>
                <Tab/>
            </div>

        )
    }
}