import * as type from "./actionTypes"
import { fromJS } from "immutable"

// 将当前组件中的state数据转换成immutable类型对象 (map对象)
// 如果修改了immutable对象中的属性, 那么会返回一个新的immutable类型对象
let loginState = fromJS({
    isLoading: false,
    timer: null,
    captcha: null
});

let reducer = (state = loginState, action) => {
    if (action.type === type.LOGIN_LOADING_START) {
        return state.set("isLoading", true)
    }
    if (action.type === type.LOGIN_LOADING_END) {
        return state.set("isLoading", false)
    }
    // 处理清除定时器
    if (action.type === type.SET_CLEARTIMEROUT) {
        return state.set("timer", action.payload)
    }
    // 处理获取图形验证码
    if (action.type == type.GET_CAPTCHA) {
        return state.set("captcha", action.payload)
    }
    return state
};

export default reducer