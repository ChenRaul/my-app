import React,{Component} from "react";
import { NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import Header from "./Header";


export default class Tab extends Component{
    constructor(props){
        super(props);
        this.state={
            mainImg:require('../img/main_normal.svg'),
            sendInfoImg:require('../img/notice_normal.svg'),
            messageImg:require('../img/message_normal.svg'),
            meImg:require('../img/me_normal.svg'),
        }
    }
    componentWillMount(){
        //根据父组件的属性router获取当前显示网页路径
        const routePath = this.context.router.history.location.pathname;
        if(routePath === '/'){
            this.setState({
                mainImg:require('../img/main_select.svg'),
                // sendInfoImg:require('../img/main_normal.svg'),
                // messageImg:require('../img/main_normal.svg'),
                // meImg:require('../img/main_normal.svg'),
            });
        }else if(routePath === '/notice'){
            this.setState({
                // mainImg:require('../img/main_normal.svg'),
                sendInfoImg:require('../img/notice_select.svg'),
                // messageImg:require('../img/main_normal.svg'),
                // meImg:require('../img/main_normal.svg'),
            });
        }else if(routePath === '/message'){
            this.setState({
                // mainImg:require('../img/main_normal.svg'),
                // sendInfoImg:require('../img/main_normal.svg'),
                messageImg:require('../img/message_select.svg'),
                // meImg:require('../img/main_normal.svg'),
            });
        }else if(routePath === '/me'){
            this.setState({
                // mainImg:require('../img/main_normal.svg'),
                // sendInfoImg:require('../img/main_normal.svg'),
                // messageImg:require('../img/main_normal.svg'),
                meImg:require('../img/me_select.svg'),
            });
        }

    }

    render(){
        let linkToMeOrLogin = this.props.isLogin?'/me':'/login';
        return(
            <div className={'tabRoot'}>
                <li className={'tab'}>
                    <NavLink exact={true} className={'normal'} to={"/"} activeClassName={'select'}

                    >
                        <img src={this.state.mainImg} width={20}height={20}/>
                        首页
                    </NavLink>
                </li>
                <li className={'tab'}>
                    <NavLink className={'normal'} to={"/notice"} activeClassName={'select'}>
                        <img src={this.state.sendInfoImg} width={20}height={20}/>
                        发表
                    </NavLink>
                </li>
                <li className={'tab'}>
                    <NavLink className={'normal'} to={"/message"} activeClassName={'select'}>
                        <img src={this.state.messageImg} width={20}height={20}/>
                         消息
                    </NavLink>
                </li>
                <li className={'tab'}>
                    <NavLink className={'normal'} to={linkToMeOrLogin} activeClassName={'select'}>
                        <img src={this.state.meImg} width={20}height={20}/>
                        我的
                    </NavLink>
                </li>
            </div>
        )
    }
}
// 访问父组件们的props，由于使用了react-router-dom，所以根组件是BrowserRouter，该组件有属性router可以使用
//使用此方法可以直接调用父组件的属性，也就是router。这是旧版react的使用方式，新版不一样
Tab.contextTypes = {
    router:PropTypes.object.isRequired,
}