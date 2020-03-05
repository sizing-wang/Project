import * as type from "./actionTypes"
import { fromJS } from "immutable"
import list from "../list";


// 将当前组件中的state数据转换成immutable类型对象 (map对象)
// 如果修改了immutable对象中的属性, 那么会返回一个新的immutable类型对象
let defaultState = fromJS({
    isLoading: false,
    current: 0,
    total: 0,
    pageSize: 0,
    list: [],
    name: null,
    key: null,
    value: null
});

let reducer = (state = defaultState, action) => {
    if (type.ISLOADING_START == action.type) {
        return state.set("isLoading", true)
    }
    if (type.ISLOADING_END == action.type) {
        return state.set("isLoading", false)
    }
    if (type.GET_ATTR_LIST == action.type) {
        return state.merge({
            current: action.payload.current,
            total: action.payload.total,
            pageSize: action.payload.pageSize,
            list: fromJS(action.payload.list)
        })
    }
    if (type.GET_ATTR_DETAIL == action.type) {
        return state.merge({
            name: action.payload.name,
            key: action.payload.key,
            value: action.payload.value
        })
    }

    return state
};

export default reducer