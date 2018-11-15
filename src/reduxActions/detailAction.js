import {actionTypes} from "./mainStateAction";

//Detail页面的action
export function addDetailDataAction(item) {
    return{
        type:actionTypes.DETAIL_STATE,
        item
    }
}