
export const actionTypes={
    MAIN_STATE:'MAIN_STATE',
    NOTICE_STATE:'NOTICE_STATE',
    DETAIL_STATE:'DETAIL_STATE',

}

export function recoverMainStateAction(mainDatas) {
    return{
        type:actionTypes.MAIN_STATE,
        mainDatas
    }
}