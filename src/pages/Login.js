
import React,{Component} from "react";
import Header from "./Header";


export default class Login extends Component{

    render(){
        console.log("login Props:",this.props);
        return(
            <div className={'mainRoot'}>
                <Header {...this.props}/>
                <div className={'mainContent'}>我是登录</div>
            </div>

        )
    }
}
