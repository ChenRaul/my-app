import React,{Component} from "react";
import PropTypes from "prop-types";
export default class Header extends Component{
    static defaultProps={
        title:"登录",//默认
    }
    render(){
        console.log("Header props",this.props);
        return(
            <div className={'headerRoot'}>
                <img className={'headerBack'} onClick={()=>{
                    //使用context来获取父组件的router属性，但是React官方不推荐这样使用，因为可能以后会将此功能给丢弃。
                    //所以改用下面的方法
                    //     this.context.router.history.goBack();

                    //     在路由列表的最外面添加<Router  history={history}>  </Router>，
                    // 这样就能直接通过this.props来调用history控制路由跳转
                    //但是由于Header是一个组件，所以需要父组件将props传递下来
                        this.props.history.goBack();
                    }}
                     src={require('../img/back.svg')} width={25} height={25}/>
                <div className={'headerTitle'}>{this.props.title}</div>
                <div style={{width:35}}/>
            </div>

        )
    }
}

// 访问父组件们的props，由于使用了react-router-dom，所以根组件是BrowserRouter，该组件有属性router可以使用
//使用此方法可以直接调用父组件的属性，也就是router。这是旧版react的使用方式，新版不一样。
//这样就不用一级一级的传递props给子组件，解决多级传递props的烦恼，具体点就是通过Context上下文来获取父组件的router属性
Header.contextTypes = {
    router:PropTypes.object.isRequired,
}