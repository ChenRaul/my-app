
import React,{Component} from "react";
import Header from "./Header";


export default class Login extends Component{

    render(){
        return(
            <div className={'mainRoot'}>
                <Header/>
                <div className={'mainContent'}>我是登录</div>
            </div>

        )
    }
}
