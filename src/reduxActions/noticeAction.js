import {actionTypes} from "./mainStateAction";


export function noticeAction(item) {
    return{
        type:actionTypes.NOTICE_STATE,
        item
    }
}