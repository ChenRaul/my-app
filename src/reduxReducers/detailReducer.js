import {actionTypes} from "../reduxActions/mainStateAction";


const detailDataList={};//state初始值
//保存的详情对象，使用对象来保存，根据每一个数据的id来作为key保存，避免重复

export function saveDetailDataReducer(state = detailDataList,action) {
    switch (action.type){
        case actionTypes.DETAIL_STATE:
            let temp={};
            console.log("detailReducer id:",action.item.id)
            temp[action.item.id] = action.item;
            //该id是否已经保存了，否则直接返回原对象
            if(!detailDataList.hasOwnProperty(action.item.id)){
                return {...state,...temp};
            }else{
                return state;
            }
        default:
            return state;
    }
}
