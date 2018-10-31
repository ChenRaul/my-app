import React,{Component} from "react";
import {BrowserRouter, NavLink, Router} from "react-router-dom";
import Tab from "./Tab";


export default class Message extends Component{

    render(){
        return(
            <div className={'mainRoot'}>
                <div className={'mainContent'}>我是消息</div>
                <Tab/>
            </div>

        )
    }
}