import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import HttpFetchUtil from "./HttpFetchUtil";
import * as detailAction from "../reduxActions/detailAction";
import {bindActionCreators} from "redux";







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
                    <div className={'authorHead'} style={{ backgroundImage: 'url(' + data.author.avatar_url + ')' }}/>
                    <div>
                        <div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>


                {/*// dangerouslySetInnerHTML设置一段网页内容到页面中去，react专用*/}
                <div style={{flex:1,}} dangerouslySetInnerHTML={{__html: this.props.data[this.props.match.params.id].content}}/>

            </div>
        )
    }
    render(){
        console.log("Detail Props：",this.props);
        return(
            <div className={'mainRoot'}>
                {/*将页面的props传递给Header组件*/}
                <Header {...this.props} title={'详情'}/>
                {this.props.data[this.props.match.params.id] ? this.renderArticleContent() : <div className={'loadMore'}/>}
            </div>
        )
    }
}

function mapStateToProps(state){
        //data实际上是一个对象
    return {data:state.detailReducer};
}
//将action绑定到props，以便组件props中存在改action，可以通过action直接调用recoverMainStateAction更新保存当前点击的tab index，然后更新redux的store
const mapDispatchToProps = (dispatch) =>{
    return {
        //bindActionCreators的第一个参数是函数，所以不能直接写recoverMainStateReducer，因为recoverMainStateReducer返回的是一个对象
        //注意import也必须按照此处文件这样，也就是说第一个参数必须是action creater，所以可以把所有的action写在一个文件里面
        action:bindActionCreators(detailAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Detail);