import {actionTypes} from "../reduxActions/mainStateAction";

//首页的数据结构，包含了该页面中的tab的点击index，以便保存UI状态
const mainDatas={
    backUpClickIndex:0,
    allData:[],
    betterData:[],
    shareData:[],
    answerData:[],
    offerData:[],
}

export function recoverMainStateReducer(state = mainDatas,action) {
    switch (action.type){
        case actionTypes.MAIN_STATE:
            console.log('更新')
            console.log({...state,...action.mainDatas});
            return {...state,...action.mainDatas};
        default:
            return state;
    }
}
