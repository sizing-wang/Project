import * as type from "./actionTypes"
import api from "api"

const getSetPageAction = (payload) => ({
    type: type.SET_PAGE,
    payload
});
const getPageLoadingStart = () => ({
    type: type.SET_LOADING_START
});
const getPageLoadingEnd = () => ({
    type: type.SET_LOADING_END
});

let timer;
export const getPageAction = (page) => {
    return function (dispatch, getState) {
        // 发送请求前, 派发loading状态action
        dispatch(getPageLoadingStart());
        // 发送ajax请求
        /*
        timer = setTimeout(() => {
            api.getUserList({
                page: page
            })
                .then(result => {
                    // console.log("--------", result.data);
                    let data = result.data;
                    if (data.code === 0) {
                        dispatch(getSetPageAction(result.data.data))
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    // 请求结束后, 派发取消loading状态的action
                    dispatch(getPageLoadingEnd())
                })
        }, 500)
        */

        api.getUserList({
            page: page
        })
            .then(result => {
                // console.log("--------", result.data);
                let data = result.data;
                if (data.code === 0) {
                    dispatch(getSetPageAction(result.data.data))
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                // 请求结束后, 派发取消loading状态的action
                dispatch(getPageLoadingEnd())
            })

    }

};

const clearSetTimerOut = (payload) => ({
    type: type.CLEAR_SETTIMEROUT,
    payload
})
// 处理清除定时器
export const getClearSetTimerOut = (timer) => {
    return function (dispatch, getState) {
        // 派发action, 清除定时器
        dispatch(clearSetTimerOut(timer))
    }
}
