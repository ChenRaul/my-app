import {combineReducers} from "redux";
import {recoverMainStateReducer} from "./mainStateReducer";
import {noticeReducer} from "./noticeReducer";

//combineReducers用于将多个reducer合并，然后返回新的state对象，新对象包含了每个reducer的state原对象
//也就是说实际上myReducers就是一个state对象
const myReducers =  combineReducers({
        recoverMainStateReducer,
        noticeReducer,
    });
export default myReducers;