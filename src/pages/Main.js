import React,{Component} from "react";
import Tab from "./Tab";
import {connect,} from "react-redux";
import {bindActionCreators} from "redux";
import * as mainStateAction from  "../reduxActions/mainStateAction";
import LoadView from "./LoadView";
import HttpFetchUtil from "./HttpFetchUtil";
import {NavLink} from "react-router-dom";




//此种方法由于跳转到其他页面然后返回时，会恢复该页面的初始状态，所以需要使用redux来保存该页面当前的状态，
class MainTabPage extends Component{
    static defaultProps={
        mainDatas:{},//父组件传递下来的数据结构
        action:{},//父组件传递下来的action，用于发送action
    }
    constructor(props){
        super(props);
        this.state={
            // currentClickTabIndex:this.props.mainDatas.currentClickTabIndex,
            tabTitle:['全部','精华','分享','问答','招聘'],
            isShowLoading:true,
        };
    }
    componentDidMount(){
        console.log('componentDidMount fetch data');
        this.recoverUlScrollXY();//从其他页面返回时也需要恢复之前的xy轴方向的滑动距离
        this.getData(this.props.mainDatas.currentClickTabIndex);
    }
    //接受父组件改变后的props需要重新渲染组件时用到的比较多
    componentWillReceiveProps(nextProps){
        console.log('将要接收到新的Props:')
        console.log(nextProps);
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
        //在发送action更新currentClickTabIndex之前应该保存点击之前的index的滚动x,y距离
        //当然要ul标签组件已经加载了的情况下
        if(this.ul){//跳转到其它页面时需要保存当前页面的xy轴滑动距离，其它子Tab页面的已经在点击子Tab时就保存了
            this.upDateScrollXY(this.props.mainDatas.currentClickTabIndex);
        }
    }
    shouldComponentUpdate (nextProps,nextState) {
        /**
         * 唯一用于控制组件重新渲染的生命周期，由于在react中，setState以后，state发生变化，组件会进入重新渲染的流程，（暂时这么理解，其实setState以后有些情况并不会重新渲染，比如数组引用不变）在这里return false可以阻止组件的更新

         因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断
         链接：https://www.jianshu.com/p/c9bc994933d5
         */
        return true;
    }
    componentWillUpdate (nextProps,nextState) {
        /*
        * shouldComponentUpdate返回true以后，组件进入重新渲染的流程，
        * 进入componentWillUpdate,这里同样可以拿到nextProps和nextState
        * */
    }
    //render更新props和state后，执行此方法
    //组件更新完毕后，react只会在第一次初始化成功会进入componentDidmount,之后每次重新渲染后都会进入这个生命周期，
    // 这里可以拿到prevProps和prevState，即更新前的props和state。
    componentDidUpdate(prevProps,prevState){
        //只有在ul列表更新数据后，才能准确的执行scrollTo,恢复当前tab页的数据加载x,y位置
       this.recoverUlScrollXY(); //从其他子Tab返回或者数据更新时也需要恢复之前的xy轴方向的滑动距离
        //是否加载更多数据
        if(this.props.mainDatas.isLoadMoreData != prevProps.mainDatas.isLoadMoreData && this.props.mainDatas.isLoadMoreData){
            console.log('加载更多数据');
            this.fetchData(this.props.mainDatas.currentClickTabIndex);
        }

    }
    recoverUlScrollXY(){
        switch (this.props.mainDatas.currentClickTabIndex){
            case 0:
                //有数据存在说明this.ul引用是存在的
                if(this.props.mainDatas.allData.length > 0){
                    this.ul.scrollLeft = this.props.mainDatas.allScroll.scrollX;
                    this.ul.scrollTop = this.props.mainDatas.allScroll.scrollY;
                   //android手机浏览器不支持该方法，所以统一使用上面的方式来设置滚动位置
                    // this.ul.scrollTo(this.props.mainDatas.allScroll.scrollX,this.props.mainDatas.allScroll.scrollY);
                }
                break;

            case 1:
                if(this.props.mainDatas.betterData.length > 0){
                    this.ul.scrollLeft = this.props.mainDatas.betterScroll.scrollX;
                    this.ul.scrollTop = this.props.mainDatas.betterScroll.scrollY;
                }
                break;

            case 2:
                if(this.props.mainDatas.shareData.length > 0){
                    this.ul.scrollLeft = this.props.mainDatas.shareScroll.scrollX;
                    this.ul.scrollTop = this.props.mainDatas.shareScroll.scrollY;
                }
                break;

            case 3:
                if(this.props.mainDatas.answerData.length > 0){
                    this.ul.scrollLeft = this.props.mainDatas.answerScroll.scrollX;
                    this.ul.scrollTop = this.props.mainDatas.answerScroll.scrollY;
                }
                break;

            case 4:
                if(this.props.mainDatas.offerData.length > 0){
                    this.ul.scrollLeft = this.props.mainDatas.offerScroll.scrollX;
                    this.ul.scrollTop = this.props.mainDatas.offerScroll.scrollY;
                }
                break;

        }
    }
    getData(index){
        // console.log(index)
        switch (index){
            case 0:
                if(this.props.mainDatas.allData.length > 0){
                    return;
                }
                break;

            case 1:
                if(this.props.mainDatas.betterData.length > 0){
                    return;
                }
                break;

            case 2:
                if(this.props.mainDatas.shareData.length > 0){
                    return;
                }
                break;

            case 3:
                if(this.props.mainDatas.answerData.length > 0){
                    return;
                }
                break;

            case 4:
                if(this.props.mainDatas.offerData.length > 0){
                    return;
                }
                break;
        }
        console.log('fetch data')
        this.fetchData(index);
    }
    fetchData(index,pageIndex){
        console.log(this.getUrl(index))
       try {
           HttpFetchUtil.sendGet(this.getUrl(index,pageIndex),null,(jsonData)=>{
               console.log('获取数据成功')
               // console.log(jsonData);

               if(jsonData.success){
                   console.log("index:"+index)
                       this.props.action.recoverMainStateAction({
                           isLoadMoreData:false,
                           allData:index === 0 ? jsonData.data :[],
                           betterData:index === 1 ? jsonData.data :[],
                           shareData:index === 2 ? jsonData.data :[],
                           answerData:index === 3 ? jsonData.data :[],
                           offerData:index === 4 ? jsonData.data :[],
                       });
               }else{
                   this.setState({
                       isShowLoading:false,
                   },()=> {
                       this.props.action.recoverMainStateAction({isLoadMoreData:false,})
                       alert('获取数据失败');
                   });
               }
           })
       }catch (e){
           this.props.action.recoverMainStateAction({isLoadMoreData:false,})
            console.log(e.message)
           this.setState({
               isShowLoading:false,
           },()=> {
               alert('获取数据失败');
           });
       }
    }
    setCurrentPageIndex(){
        const scroll={
            scrollX:this.ul.scrollLeft,
            scrollY:this.ul.scrollTop,
        };
        switch (this.props.mainDatas.currentClickTabIndex){
            case 0:
                return {allScroll:scroll,isLoadMoreData:true,allPageIndex:this.props.mainDatas.allPageIndex+1};
            case 1:
                return {betterScroll:scroll,isLoadMoreData:true,betterPageIndex:this.props.mainDatas.betterPageIndex+1};
            case 2:
                return {shareScroll:scroll,isLoadMoreData:true,sharePageIndex:this.props.mainDatas.sharePageIndex+1};
            case 3:
                return {answerScroll:scroll,isLoadMoreData:true,answerPageIndex:this.props.mainDatas.answerPageIndex+1};
            case 4:
                return {offerScroll:scroll,isLoadMoreData:true,offerPageIndex:this.props.mainDatas.offerPageIndex+1};
        }
    }
    getUrl(index,pageIndex){

        switch (index){
            case 0:
                // console.log('pageIndex:'+this.props.mainDatas.allPageIndex);
                return "https://cnodejs.org/api/v1/topics?tab=all&page="+this.props.mainDatas.allPageIndex+"&limit=10";
            case 1:
                return "https://cnodejs.org/api/v1/topics?tab=good&page="+this.props.mainDatas.betterPageIndex+"&limit=10";
            case 2:
                return "https://cnodejs.org/api/v1/topics?tab=share&page="+this.props.mainDatas.sharePageIndex+"&limit=10";
            case 3:
                return "https://cnodejs.org/api/v1/topics?tab=ask&page="+this.props.mainDatas.answerPageIndex+"&limit=10";
            case 4:
                return "https://cnodejs.org/api/v1/topics?tab=job&page="+this.props.mainDatas.offerPageIndex+"&limit=10";
        }
    }
    //更新tab的数据加载的滚动x,y位置
    upDateScrollXY(index){
        const scroll={
            scrollX:this.ul.scrollLeft,
            scrollY:this.ul.scrollTop,
        };
        switch (index){
            case 0:
                this.props.action.recoverMainStateAction({allScroll:scroll});
                break;
            case 1:
                this.props.action.recoverMainStateAction({betterScroll:scroll});
                break;
            case 2:
                this.props.action.recoverMainStateAction({shareScroll:scroll});
                break;
            case 3:
                this.props.action.recoverMainStateAction({answerScroll:scroll});
                break;
            case 4:
                this.props.action.recoverMainStateAction({offerScroll:scroll});
                break;
        }
    }
    //首页的tab item
    renderTabItem(item,index){
        return(
            <a   key={index} className={this.props.mainDatas.currentClickTabIndex === index?'mainTabLinkSelect':'mainTabLinkNormal'} onClick={()=>{

                if(this.props.mainDatas.currentClickTabIndex === index){
                    return;
                }
                //在发送action更新currentClickTabIndex之前应该保存点击之前的index的滚动x,y距离
                //当然要ul标签组件已经加载了的情况下
                if(this.ul){
                    this.upDateScrollXY(this.props.mainDatas.currentClickTabIndex);
                }
                this.setState({
                    isShowLoading:this.getListData(index).length > 0 ? false:true,
                },()=> {
                    //发送action，更新currentClickTabIndex
                    this.ul.scrollLeft = 0;
                    this.ul.scrollTop =0;
                    this.props.action.recoverMainStateAction({currentClickTabIndex:index});
                    this.getData(index);
                });

            }}
            >
                {item}
            </a>
        )
    }
    //列表Item
    renderItem(item,index){
        return(
            <li key={index} >
                {/*跳转到Detail详情页面，并传递id参数过去*/}
                <NavLink to={`/detail/${item.id}`} className={'mainLi'}>
                    <div className={'mainListAuthorHead'} style={{backgroundImage: 'url(' + item.author.avatar_url + ')' }}/>
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
                </NavLink>
            </li>
        )
    }
    //格式化时间
    getTime(time){
        let date = new Date(time);
        let date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return date_value;
    }
    getListData(index){
        switch (index){
            case 0:
                return this.props.mainDatas.allData;
            case 1:
                return this.props.mainDatas.betterData;
            case 2:
                return this.props.mainDatas.shareData;
            case 3:
                return this.props.mainDatas.answerData;
            case 4:
                return this.props.mainDatas.offerData;
        }
    }
    render(){
        let list= this.getListData(this.props.mainDatas.currentClickTabIndex).map((item,index)=> this.renderItem(item,index));
        return(
            <div className={'mainContent'}>
                <div className={'mainTabRoot'}>
                    {this.state.tabTitle.map((item,index)=>{
                        return this.renderTabItem(item,index)
                    })}
                </div>
                <ul ref={(o)=>this.ul=o} className={'mainUl'}
                    onScroll={(event)=>{
                        //判断是否加载更多，
                        console.log(event.target.clientHeight +"-----"+  event.target.scrollTop+"-----"+  event.target.scrollHeight);
                        //event.target.scrollTop!==0 添加这个条件，主要是因为所有的Tab都公用一个ul，导致如果前面的tab加载了更多，
                        //就会导致event.target.scrollHeight和event.target.clientHeight在数据加载完成前时就会一样，导致自动加载更多。
                        //后面如果每一个tab都有 自己的isLoadMoreData应该就不存在这个问题了 后面会修改
                        if(event.target.clientHeight +  event.target.scrollTop === event.target.scrollHeight && event.target.scrollTop!==0){
                            //获取更多数据

                            if(!this.props.mainDatas.isLoadMoreData){
                                 this.props.action.recoverMainStateAction(this.setCurrentPageIndex());
                            }
                        }

                    }}
                >
                    {list }
                    { this.state.isShowLoading &&
                        <li>
                            <div className={'loadMore'}/>
                        </li>
                    }
                </ul>
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