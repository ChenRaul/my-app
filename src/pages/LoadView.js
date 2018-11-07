import React from "react";


export default class LoadView extends React.Component{


    render(){
        return(
            <div className={'loadViewRoot'}>
                <div className={'loadView'}/>
                <div >
                    加载中...
                </div>
            </div>
        )
    }
}