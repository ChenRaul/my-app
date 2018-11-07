import {actionTypes} from "../reduxActions/mainStateAction";


const noticeDatas={
    noticeIndex:2,
    // allData:[],
    // betterData:[],
    // shareData:[],
    // answerData:[],
    // offerData:[],
}

export function noticeReducer(state = noticeDatas,action) {
    switch (action.type){
        case actionTypes.NOTICE_STATE:
            if(action){
                return state;
            }
            return {...state,...action.item};
        default:
            return state;
    }
}
