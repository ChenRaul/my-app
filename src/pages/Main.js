import React,{Component} from "react";
import Tab from "./Tab";
import {connect,} from "react-redux";
import {bindActionCreators} from "redux";
import * as mainStateAction from  "../reduxActions/mainStateAction";
import LoadView from "./LoadView";
import HttpFetchUtil from "./HttpFetchUtil";


//此种方法由于跳转到其他页面然后返回时，会恢复该页面的初始状态，所以需要使用redux来保存该页面当前的状态，
class MainTabPage extends Component{
    static defaultProps={
        mainDatas:{},//父组件传递下来的数据结构
        action:{},//父组件传递下来的action，用于发送action
    }
    constructor(props){
        super(props);
        this.state={
            currentClickTabIndex:this.props.mainDatas.backUpClickIndex,
            tabTitle:['全部','精华','分享','问答','招聘'],
        };
    }
    componentDidMount(){
        this.fetchData(this.state.currentClickTabIndex);//默认获取this.props.mainDatas.backUpClickIndex的数据
    }
    fetchData(index){
       try {
           HttpFetchUtil.sendGet(this.getUrl(index),null,(jsonData)=>{
               console.log(jsonData);
               if(jsonData.success){
                   this.props.action.recoverMainStateAction({
                       allData:index === 0 ? jsonData.data :this.props.mainDatas.allData,
                       betterData:index === 1 ? jsonData.data :this.props.mainDatas.betterData,
                       shareData:index === 2 ? jsonData.data :this.props.mainDatas.shareData,
                       answerData:index === 3 ? jsonData.data :this.props.mainDatas.answerData,
                       offerData:index === 4 ? jsonData.data :this.props.mainDatas.offerData,
                   });
               }else{
                   alert('获取数据失败');
               }
           })
       }catch (e){
            console.log(e.message)
       }
    }
    getUrl(index){
        switch (index){
            case 0:
                return "https://cnodejs.org/api/v1/topics?tab=all&page=1&limit=10";
            case 1:
                return "https://cnodejs.org/api/v1/topics?tab=good&page=1&limit=10";
            case 2:
                return "https://cnodejs.org/api/v1/topics?tab=share&page=1&limit=10";
            case 3:
                return "https://cnodejs.org/api/v1/topics?tab=ask&page=1&limit=10";
            case 4:
                return "https://cnodejs.org/api/v1/topics?tab=job&page=1&limit=10";
        }
    }
    renderTabItem(item,index){
        return(
            <a   key={index} className={this.state.currentClickTabIndex === index?'mainTabLinkSelect':'mainTabLinkNormal'} onClick={()=>{
                this.setState({currentClickTabIndex:index},()=>{
                    //发送action，更新redux的state
                    this.props.action.recoverMainStateAction({backUpClickIndex:index});
                    this.fetchData(index);
                });
            }}
            >
                {item}
            </a>
        )
    }
    renderItem(item,index){
        return(
            <li key={index} >
                <div className={'mainLi'}>
                    <div style={{width:80}}>
                        <img className={'authorHead'} src={item.author.avatar_url} width={80} height={80}/>
                    </div>
                    <div className={'liContentRoot'}>
                        <div className={'liContentTitle'}>
                            <h4>{item.title}</h4>
                        </div>
                        <div className={'liContentAuthor'}>
                            <div className={''}>{item.author.loginname}</div>
                            <div className={''}>{item.reply_count}/{item.visit_count}</div>
                        </div>
                        <div className={'liContentAuthor'}>
                            <div className={''}>{this.getTime(item.create_at)}</div>
                            <div className={''}>{this.getTime(item.last_reply_at)}</div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
    getTime(time){
        let date = new Date(time);
        let date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return date_value
    }
    renderContentItem(data){
        let contentItem =  data.length > 0 ?
            <ul className={'mainUl'}>
                { data.map((item,index)=> this.renderItem(item,index))}
            </ul>
            :
            <LoadView/>
        return contentItem;

    }
    renderContent(){
        switch (this.state.currentClickTabIndex){
            case 0:
                return this.renderContentItem(this.props.mainDatas.allData);
            case 1:
                return this.renderContentItem(this.props.mainDatas.betterData);
            case 2:
                return this.renderContentItem(this.props.mainDatas.shareData);
            case 3:
                return this.renderContentItem(this.props.mainDatas.answerData);
            case 4:
                return this.renderContentItem(this.props.mainDatas.offerData);
        }
    }
    render(){

        return(
            <div className={'mainContent'}>
                <div className={'mainTabRoot'}>
                    {this.state.tabTitle.map((item,index)=>{
                        return this.renderTabItem(item,index)
                    })}
                </div>
                {this.renderContent()}
            </div>
        )
    }
}

class Main extends Component{
    render(){
        return(
            <div className={'mainRoot'}>
                <MainTabPage mainDatas={this.props.mainDatas} action={this.props.action}/>
                <Tab />
            </div>
        )
    }
}
//将redux的state转换成props，以便组件props中存在mainDatas，可以直接调用
//此处的参数state实际上包含了myReducers中的myReducers对象，myReducers对象实际上包含了多个reducer的state合并后的对象，
//此页面只需要recoverMainStateReducer对象，所以将state.recoverMainStateReducer赋值给mainDatas，此处的mainDatas实际上与
// mainStateAction中的mainDatas的值相同，但是对象不一样,说白了就是数据结构是一样的
function mapStateToProps(state){

    return {mainDatas:state.recoverMainStateReducer};
}
//将action绑定到props，以便组件props中存在改action，可以通过action直接调用recoverMainStateAction更新保存当前点击的tab index，然后更新redux的store
const mapDispatchToProps = (dispatch) =>{
    return {
        //bindActionCreators的第一个参数是函数，所以不能直接写recoverMainStateReducer，因为recoverMainStateReducer返回的是一个对象
        //注意import也必须按照此处文件这样，也就是说第一个参数必须是action creater，所以可以把所有的action写在一个文件里面
       action:bindActionCreators(mainStateAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);