import React,{Component} from "react";
import Tab from "./Tab";


export default class Main extends Component{

    render(){
        return(
            <div className={'mainRoot'}>
                <div className={'mainContent'}>我是首页</div>
                <Tab />
            </div>
        )
    }
}