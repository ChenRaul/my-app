import {actionTypes} from "../reduxActions/mainStateAction";

//首页的数据结构，包含了该页面中的tab的点击index，以便保存UI状态
//数据结构太复杂，后面需要修改
const mainDatas={
    currentClickTabIndex:0,
    //TODO 是否加载更多也应该每个页面都有一个比较合适
    isLoadMoreData:false,//是否加载更多数据，以及判断是不是正在加载更多数据
    allPageIndex:1,
    betterPageIndex:1,
    sharePageIndex:1,
    answerPageIndex:1,
    offerPageIndex:1,

    allScroll:{
        scrollX:0,
        scrollY:0,
    },
    betterScroll:{
        scrollX:0,
        scrollY:0,
    },
    shareScroll:{
        scrollX:0,
        scrollY:0,
    },
    answerScroll:{
        scrollX:0,
        scrollY:0,
    },
    offerScroll:{
        scrollX:0,
        scrollY:0,
    },
    allData:[],
    betterData:[],
    shareData:[],
    answerData:[],
    offerData:[],
}

export function recoverMainStateReducer(state = mainDatas,action) {
    switch (action.type){
        case actionTypes.MAIN_STATE:
            // console.log('更新')
            let temp = state;
            console.log(action.mainDatas)
            if(action.mainDatas.allData){//更新list数据
                if(action.mainDatas.allData.length> 0){
                    temp.allData = [...temp.allData,...action.mainDatas.allData];
                }
                if(action.mainDatas.betterData.length> 0){
                    temp.betterData = [...temp.betterData,...action.mainDatas.betterData];
                }
                if(action.mainDatas.shareData.length> 0){
                    temp.shareData = [...temp.shareData,...action.mainDatas.shareData];
                }
                if(action.mainDatas.answerData.length> 0){
                    temp.answerData = [...temp.answerData,...action.mainDatas.answerData];
                }
                if(action.mainDatas.offerData.length> 0){
                    temp.offerData = [...temp.offerData,...action.mainDatas.offerData];
                }
                temp.isLoadMoreData = action.mainDatas.isLoadMoreData;
                console.log({...state,...temp})
                return {...state,...temp};
            }else{
                // console.log(action.mainDatas);
                // console.log({...state,...action.mainDatas})
                return {...state,...action.mainDatas};
            }

        default:
            return state;
    }
}
