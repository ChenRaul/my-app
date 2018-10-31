import React,{Component} from "react";
import {BrowserRouter, NavLink, Router} from "react-router-dom";


export default class Tab extends Component{

    render(){
        return(
            <div className={'tabRoot'}>
                <li className={'tab'}>
                    <NavLink exact={true} className={'normal'} to={"/"} activeClassName={'select'}>
                        <img src={'../img/logo.svg'} width={20}height={20}/>
                        首页
                    </NavLink>
                </li>
                <li className={'tab'}>
                    <NavLink className={'normal'} to={"/notice"} activeClassName={'select'}>
                        发表
                    </NavLink>
                </li>
                <li className={'tab'}>
                    <NavLink className={'normal'} to={"/message"} activeClassName={'select'}>
                         消息
                    </NavLink>
                </li>
                <li className={'tab'}>
                    <NavLink className={'normal'} to={"/me"} activeClassName={'select'}>
                        我的
                    </NavLink>
                </li>
            </div>
        )
    }
}