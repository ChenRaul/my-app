import React,{Component} from 'react';
import {connect} from "react-redux";
import Header from "./Header";
import HttpFetchUtil from "./HttpFetchUtil";
import Tool from "./Tool";
import {NavLink} from "react-router-dom";
class User extends Component{
    constructor(props){
        super(props);
        this.state={
            userData:null,
            tabTitle:['主题','回复'],
            currentTabIndex:0,
            listData:[],
        }
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData(){
        try{
            HttpFetchUtil.sendGet("https://cnodejs.org/api/v1/user/"+this.props.match.params.loginname,null,(jsonData)=>{
                console.log('User get data:',jsonData);
                // this.props.action.addDetailDataAction(jsonData.data);
                if(jsonData.success){
                    let temp = [];
                    temp.push(jsonData.data.recent_topics);
                    temp.push(jsonData.data.recent_replies);
                    this.setState({
                        userData:jsonData.data,
                        listData:temp,
                    });
                }else{
                    this.setState({
                        userData:null,
                        listData:null,
                    });
                }

            })
        }catch (e){
            this.setState({
                isLoadOver:true,
                userData:null,
            });
        }
    }
    renderTabItem(item,index){
        return(
            <a   key={index} className={this.state.currentTabIndex === index ? 'userTabItemSelect':'userTabItemNormal'}
                 onClick={()=>{
                     this.setState({
                         currentTabIndex:index,
                     })
                 }}
            >
                {item}
            </a>
        )
    }
    renderContent(){
        return(
           <div className={'userContentRoot'}>
               <div className={'userHeaderRoot'}>
                   <img className={'authorHead'} style={{width:'5em',height:'5em',margin:'1em'}} src={this.state.userData.avatar_url} />
                   <div className={'userInfoRoot'} >
                       <div style={{height:'1.5em',fontSize:'1em',color:'white',margin:'0.1em'}}>
                           {this.state.userData.loginname}
                       </div>
                       <div className={'userScoreRoot'} style={{height:'1em',color:'white',fontSize:'0.8em',marginBottom:'0.5em'}}>
                           积分：{this.state.userData.score}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注册时间：{Tool.formatDate(this.state.userData.create_at)}
                       </div>
                   </div>
                   <div className={'userTabRoot'}>
                       {this.state.tabTitle.map((item,index)=>{
                           return this.renderTabItem(item,index)
                       })}
                   </div>
               </div>
               <ul className={'userUl'}>
                   {
                       this.state.listData[this.state.currentTabIndex].length > 0 ?this.state.listData[this.state.currentTabIndex].map((item,index)=>{
                           return(
                               <li key={index}>
                                   <NavLink to={`/detail/${item.id}`}  className={'userLiItem'}>
                                       <div className={'userLiTitle'}>{item.title}</div>
                                       <div className={'userLiTime'}>{Tool.formatDate(item.last_reply_at)}</div>
                                   </NavLink>
                               </li>
                           )
                       })
                           :
                           <li className={'userLiItem'} style={{justifyContent:'center',alignItems:'flex-start'}}>
                               暂无内容
                           </li>
                   }
               </ul>
           </div>
        )
    }
    render(){
        console.log('UserCenter Props:',this.props);
        return(
            <div className={'mainRoot'}>
                {/*将页面的props传递给Header组件*/}
                <Header history={this.props.history} title={'个人中心'}/>
                {this.state.userData ?
                        this.renderContent()
                    :
                        <div className={'loadMore'}/>
                }
            </div>
        )
    }
}
export default connect()(User);