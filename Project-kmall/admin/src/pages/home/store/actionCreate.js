import * as type from "./actionTypes"
import api from "api"

const getCountsNum = (result) => ({
    type: type.GET_COUNTS,
    payload: result
});

export const getCountsAction = () => {
    return function (dispatch, getState) {
        // 发送ajax请求
        api.getCounts()
            .then(result => {
                // console.log(":::::", result);
                dispatch(getCountsNum(result.data))
            })
            .catch(err => {
                console.log(err);
            })

        /*
        axios({
            method: "get",
            url: "http://127.0.0.1:3000/counts",
            withCredentials: true // 允许携带cookie信息
        })
            .then(result => {
                // console.log(":::::", result);
                dispatch(getCountsNum(result.data))
            })
            .catch(err => {
                console.log(err);
            })
         */

    }

};