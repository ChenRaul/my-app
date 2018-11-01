import React,{Component} from "react";
import Tab from "./Tab";


export default class Notice extends Component{

    render(){
        return(
            <div className={'mainRoot'}>
                <div className={'mainContent noticeContent'}>我是发表</div>
                <Tab />
            </div>

        )
    }
}