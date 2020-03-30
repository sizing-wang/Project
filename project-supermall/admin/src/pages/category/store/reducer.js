import * as type from "./actionTypes"
import { fromJS } from "immutable"


// 将当前组件中的state数据转换成immutable类型对象 (map对象)
// 如果修改了immutable对象中的属性, 那么会返回一个新的immutable类型对象
let defaultState = fromJS({
    list: [],
    current: 0,
    pageSize: 0,
    total: 0,
    isLoading: false,
    categories: [],
    timer: null,
    mobileImage: "",
    pid: "",
    name: "",
    mobileName: "",
    icon: ""
});

let reducer = (state = defaultState, action) => {
    if (action.type === type.SET_PAGE) {
        return state.merge({
            list: fromJS(action.payload.list),
            current: action.payload.current,
            pageSize: action.payload.pageSize,
            total: action.payload.total
        })
    }
    if (action.type === type.SET_LOADING_START) {
        return state.set("isLoading", true)
    }
    if (action.type === type.SET_LOADING_END) {
        return state.set("isLoading", false)
    }
    if (action.type === type.SET_LEVEL_CATEGORIES) {
        return state.set("categories", fromJS(action.payload))
    }
    if (action.type === type.SET_MOBILE_IMAGE) {
        return state.set("mobileImage", action.payload)
    }

    // 处理分类详情数据
    if (action.type === type.SET_CATEGORY_DETAIL) {
        return state.merge({
            pid: action.payload.pid,
            name: action.payload.name,
            mobileName: action.payload.mobileName,
            icon: action.payload.icon
        })
    }
    return state
};

export default reducer