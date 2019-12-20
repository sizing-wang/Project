import * as type from "./actionTypes"
import axios from "axios"
import { message } from "antd"
import { setUsername } from "util"
import api from "api"


const getLoginStart = () => ({
    type: type.LOGIN_LOADING_START
});
const getLoginEnd = () => ({
    type: type.LOGIN_LOADING_END
});

let timer;
export const getHandleLogin = (value) => {
    value.role = "admin";
    return function (dispatch, getState) {
        // 发送请求前, 派发加载图标action
        dispatch(getLoginStart());
        api.login(value)
            .then(result => { // 请求成功
                // console.log(result);
                const data = result.data;
                if (data.code === 0) { // 登录成功
                    // 将用户信息存储在浏览器中
                    setUsername(data.data.username);
                    message.success("登陆成功");
                    // 去到后台管理中心首页
                    /*
                    timer = setTimeout(() => {
                        window.location.href = "/"
                    }, 1000)
                     */
                    window.location.href = "/"
                } else if (data.code === 1) { // 登录失败
                    message.error(data.message);
                }
            })
            .catch(err => { // 请求失败
                console.log(err);
            })
            .finally(() => {
                // 请求结束后, 派发loading图标的action
                /*
                timer = setTimeout(() => {
                    dispatch(getLoginEnd())
                }, 1000)
                 */
                dispatch(getLoginEnd())
            })
        /*
        axios({
            method: "post",
            url: "http://127.0.0.1:3000/sessions/users",
            withCredentials: true,
            data: value
        })
            .then(result => { // 请求成功
                // console.log(result);
                const data = result.data;
                if (data.code === 0) { // 登录成功
                    // 将用户信息存储在浏览器中
                    setUsername(data.data.username);
                    message.success("登陆成功");
                    // 去到后台管理中心首页
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 1000)
                } else if (data.code === 1) { // 登录失败
                    message.error(data.message);
                }
            })
            .catch(err => { // 请求失败
                console.log(err);
            })
            .finally(() => {
                // 请求结束后, 派发loading图标的action
                setTimeout(() => {
                    dispatch(getLoginEnd())
                }, 1000)
            })
         */

    }
};
// 处理清除定时器
const setClearTimerOut = (payload) => ({
    type: type.SET_CLEARTIMEROUT,
    payload
})
export const getClearTimerOutAction = () => {
    return function (dispatch, getState) {
        dispatch(setClearTimerOut(timer))
    }
}