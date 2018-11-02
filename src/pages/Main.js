import React,{Component} from "react";
import Tab from "./Tab";
import {NavLink} from "react-router-dom";


//此种方法由于跳转到其他页面时，会恢复该页面的初始状态，所以需要使用redux来保存该页面当前的状态，下周研究使用redux来解决
class MainTabPage extends Component{

    constructor(props){
        super(props);
        this.state={
            preClickTabIndex:0,
            tabTitle:['全部','精华','分享','问答','招聘'],
            normal:['mainTabLinkSelect','mainTabLinkNormal','mainTabLinkNormal','mainTabLinkNormal','mainTabLinkNormal'],
        };
    }
    renderTabItem(currentTabIndex){
        return(
            <a  className={this.state.normal[currentTabIndex]} onClick={()=>{
                let tabStyle= this.state.normal.slice();
                tabStyle[this.state.preClickTabIndex] = 'mainTabLinkNormal';
                tabStyle[currentTabIndex] = 'mainTabLinkSelect';
                this.setState({normal:tabStyle,preClickTabIndex:currentTabIndex});
            }}
            >
                {this.state.tabTitle[currentTabIndex]}
            </a>
        )
    }
    render(){
        return(
            <div className={'mainContent'}>
                <div className={'mainTabRoot'}>
                    {this.state.normal.map((item,index)=>{
                        return this.renderTabItem(index)
                    })}
                </div>
                <div>
ss
                </div>
            </div>
        )
    }
}

export default class Main extends Component{

    render(){
        return(
            <div className={'mainRoot'}>
                <MainTabPage/>
                <Tab />
            </div>
        )
    }
}