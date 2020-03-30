import * as type from "./actionTypes"
import { fromJS } from "immutable"

// 将当前组件中的state数据转换成immutable类型对象 (map对象)
// 如果修改了immutable对象中的属性, 那么会返回一个新的immutable类型对象
let defaultState = fromJS({
    current: 0,
    pageSize: 0,
    total: 0,
    list: [],
    isLoading: false,
    orderDetail: {}
});

let reducer = (state = defaultState, action) => {
    if (action.type == type.GET_ORDER_LIST) {
        return state.merge({
            current: action.payload.current,
            pageSize: action.payload.pageSize,
            total: action.payload.total,
            list: fromJS(action.payload.list)
        })
    }
    if (action.type === type.SET_ISLOADING_START) {
        return state.set("isLoading", true)
    }
    if (action.type === type.SET_ISLOADING_END) {
        return state.set("isLoading", false)
    }
    if (action.type == type.GET_ORDER_DETAIL) {
        return state.set("orderDetail", action.payload)
    }
    return state
};

export default reducer