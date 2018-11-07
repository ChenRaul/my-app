import React,{Component} from "react";
import Tab from "./Tab";
import {connect} from "react-redux";
import * as noticeAction from "../reduxActions/noticeAction";
import {bindActionCreators} from "redux";


class Notice extends Component{

    render(){
        console.log(this.props);
        return(
            <div className={'mainRoot'}>
                <div className={'mainContent noticeContent'}>我是发表</div>
                <Tab />
            </div>

        )
    }
}
//将state转换成props，以便组件props中存在mainDatas，可以直接调用
function mapStateToProps(state){

    return {noticeDatas:state.noticeReducer}
}
//将action绑定到props，以便组件props中存在改action，可以通过action直接调用recoverMainStateAction更新保存当前点击的tab index，然后更新redux的store
function mapDispatchToProps(dispatch) {
    return {
        action:bindActionCreators(noticeAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Notice);