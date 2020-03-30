import * as type from "./actionTypes"
import { fromJS } from "immutable"
import list from "less/lib/less/functions/list";

// 将当前组件中的state数据转换成immutable类型对象 (map对象)
// 如果修改了immutable对象中的属性, 那么会返回一个新的immutable类型对象
let defaultState = fromJS({
    list: [],
    current: 0,
    pageSize: 0,
    total: 0,
    isLoading: false,
    timer: null
});

let reducer = (state = defaultState, action) => {
    if (action.type === type.SET_PAGE) {
        return state.merge({
            list: fromJS(action.payload.list),
            current: action.payload.current,
            pageSize: action.payload.pageSize,
            total: action.payload.total,
        })
    }
    if (action.type === type.SET_LOADING_START) {
        return state.set("isLoading", true)
    }
    if (action.type === type.SET_LOADING_END) {
        return state.set("isLoading", false)
    }
    if (action.type === type.CLEAR_SETTIMEROUT) {
        return state.set("timer", action.payload)
    }
    return state
};

export default reducer