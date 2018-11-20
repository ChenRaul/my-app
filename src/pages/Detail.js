import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import HttpFetchUtil from "./HttpFetchUtil";
import * as detailAction from "../reduxActions/detailAction";
import {bindActionCreators} from "redux";
import Tool from "./Tool";
import {NavLink} from "react-router-dom";







//此页面有从其他页面传递过来的参数 id(参数名字)，通过this.props.match.params.id来获取，
// 由于react-router-dom在添加了路由的页面会自动把match，history，location等属性添加到页面的Props中去
// 可以通过打印this.props来查看
class Detail extends React.Component{

    constructor(props){
        super(props);
        this.state={

        };
    }
    componentDidMount(){
        //data实际上是一个对象，如果已经缓存了，就不需要去获取数据了
        !this.props.data[this.props.match.params.id] && this.getData();
    }
    //接受父组件改变后的props需要重新渲染组件时用到的比较多
    componentWillReceiveProps(nextProps){
        console.log('Detail Will Receive Props:',nextProps);
    }
    getData(){
        try{
            HttpFetchUtil.sendGet("https://cnodejs.org/api/v1/topic/"+this.props.match.params.id,null,(jsonData)=>{
                console.log('detail get data:',jsonData);
                this.props.action.addDetailDataAction(jsonData.data);
            })
        }catch (e){

        }
    }
    //内容主体
    renderArticleContent(){
        const data = this.props.data[this.props.match.params.id];
        return(
            <div className={'detailContentRoot'}>
                <div className={'detailContentUser'}>
                    <img className={'authorHead'} src={data.author.avatar_url} />
                    <div className={'detailUserInfo'}>
                        <div className={'detailUserInfoFirstLine'}>
                            <NavLink to={`/user/${data.author.loginname}`} className={''} style={{color:'#1296db',marginLeft:'0.5em'}}>{data.author.loginname}</NavLink>
                            <div style={{width:'100%',marginLeft:'0.5em'}}>{Tool.formatDate(data.create_at)}</div>

                            <div style={{width:'5em',textAlign:'right'}}> #楼主</div>
                        </div>
                        <div className={'detailUserInfoFirstLine'} style={{fontSize:'0.8em',color:'gray'}}>
                            <div style={{marginLeft:'0.5em'}} >阅读：{data.visit_count}</div>
                            <div style={{marginLeft:'2em'}}>回复：{data.reply_count}</div>
                        </div>
                    </div>
                </div>

               <div className={'detailContentText'}>
                   <div className={'detailTitle'}>{data.title}</div>
                   {/*// dangerouslySetInnerHTML设置一段网页内容到页面中去，react专用*/}
                   <div className={'detailContent'} style={{fontSize:'0.8em'}} dangerouslySetInnerHTML={{__html: data.content}}/>
                   <div style={{marginTop:'0.5em',marginBottom:"1em",fontSize:'0.8em'}}>
                       <div style={{backgroundColor:'#eeeeee',borderLeft:'0.5em solid #1296db',padding:'0.5em'}}>共{data.reply_count}条回复</div>
                        {/*回复列表*/}
                        <ul className={'detailReplyRoot'}>
                            {
                                data.replies.map((item,index)=>{
                                    return(
                                        <li key={index} className={'detailReplyLi'}>
                                            <img className={'authorHead'} src={item.author.avatar_url} />
                                            <div className={'replyContent'} style={{width:'100%'}}>
                                                <div className={'detailUserInfoFirstLine'}>
                                                    <NavLink to={`/user/${item.author.loginname}`} style={{color:'#1296db',marginLeft:'0.5em'}}>{item.author.loginname}</NavLink>
                                                    <div style={{width:'100%',marginLeft:'0.5em'}}>{Tool.formatDate(item.create_at)}</div>
                                                    <div style={{width:'5em',textAlign:'right'}}> #{index+1}</div>
                                                </div>
                                                <div style={{marginLeft:'0.5em',listStyle: 'none'}} dangerouslySetInnerHTML={{__html:item.content}}/>
                                                <div className={'replyShareLike'} style={{height:'3em',}}>
                                                    <div className={'detailReplyLikeImg'} style={{width:'1.5em',height:'1.5em', backgroundImage:`url(${require("../img/like.svg")})`}}
                                                        onClick={()=>{
                                                           alert('你尚未登录')

                                                        }}
                                                    />
                                                    <div style={{marginRight:'2em'}}>{item.ups.length ? item.ups.length : ''}</div>
                                                    <div className={'detailReplyLikeImg'} style={{marginRight:'2em',width:'1.5em',height:'1.5em',backgroundImage: `url(${require("../img/share.svg")})` }}
                                                         onClick={()=>{
                                                             alert('你尚未登录')

                                                         }}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                   </div>
               </div>
            </div>
        )
    }
    render(){
        console.log("Detail Props：",this.props);
        return(
            <div className={'mainRoot'}>
                {/*将页面的props传递给Header组件，以下两种方式均可，只是前者是把父组件所有的props传递给子组件。
                后者只是把子组件需要的history属性传递子组件*/}
                <Header {...this.props} title={'详情'}/>
                {/*<Header history={this.props.history} title={'详情'}/>*/}

                {this.props.data[this.props.match.params.id] ? this.renderArticleContent() : <div className={'loadMore'}/>}
            </div>
        )
    }
}

function mapStateToProps(state){
        //data实际上是一个对象
    return {data:state.saveDetailDataReducer};
}
//将action绑定到props，以便组件props中存在改action，可以通过action直接调用recoverMainStateAction更新保存当前点击的tab index，然后更新redux的store
const mapDispatchToProps = (dispatch) =>{
    return {
        action:bindActionCreators(detailAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Detail);