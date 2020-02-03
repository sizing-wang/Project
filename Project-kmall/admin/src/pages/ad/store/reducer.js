import * as type from "./actionTypes"
import { fromJS } from "immutable"


// 初始化值
let defaultState = fromJS({
    image: "",
    adImageErrMsg: "",
    current: "",
    total: "",
    pageSize: "",
    list: [],
    isLoading: false,
    name: "",
    link: "",
    position: ""
});

let reducer = (state = defaultState, action) => {
    if (type.SET_AD_IMAGE === action.type) {
        return state.merge({
            image: action.payload,
            adImageErrMsg: ""
        })
    }
    if (type.SET_ADIMAGE_ERR === action.type) {
        return state.set("adImageErrMsg", "请上传广告图片")
    }
    if (type.SET_AD_PAGES === action.type) {
        return state.merge({
            current: action.payload.current,
            total: action.payload.total,
            pageSize: action.payload.pageSize,
            list: fromJS(action.payload.list)
        })
    }
    if (type.SET_ISLOADING_START === action.type) {
        return state.set("isLoading", true)
    }
    if (type.SET_ISLOADING_END === action.type) {
        return state.set("isLoading", false)
    }
    if (type.SET_AD_DETAIL === action.type) {
        return state.merge({
            image: action.payload.image,
            name: action.payload.name,
            link: action.payload.link,
            position: action.payload.position
        })
    }


    return state
}

export default reducer