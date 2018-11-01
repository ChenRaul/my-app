import React,{Component} from "react";
import PropTypes from "prop-types";
export default class Header extends Component{

    render(){
        return(
            <div className={'headerRoot'}>
                <img className={'headerBack'} onClick={()=>{
                        this.context.router.history.goBack();
                    }}
                     src={require('../img/back.svg')} width={25} height={25}/>
                <div className={'headerTitle'}>登录</div>
            </div>

        )
    }
}

// 访问父组件们的props，由于使用了react-router-dom，所以根组件是BrowserRouter，该组件有属性router可以使用
//使用此方法可以直接调用父组件的属性，也就是router。这是旧版react的使用方式，新版不一样。
//这样就不用一级一级的传递props给子组件，解决多级传递props的烦恼
Header.contextTypes = {
    router:PropTypes.object.isRequired,
}