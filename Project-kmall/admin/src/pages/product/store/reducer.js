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
    mainImage: "",
    images: "",
    detailValue: null,
    mainImageErr: "",
    mainHelp: "",
    imagesErr: "",
    imagesHelp: "",

    category: "",
    categoryName: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    detail: ""
});

let reducer = (state = defaultState, action) => {
    if (action.type === type.SET_PRODUCTS_LIST) {
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
    if (action.type === type.SET_LEVEL_CATEGORIES) {
        return state.set("categories", fromJS(action.payload))
    }
    // 自定义组件存值
    if (action.type === type.SET_MAIN_IMAGE) {
        return state.merge({
            mainImage: action.payload,
            mainImageErr: "",
            mainHelp: ""
        })
    }
    if (action.type === type.SET_IMAGES) {
        return state.merge({
            images: action.payload,
            imagesErr: "",
            imagesHelp: ""
        })
    }
    if (action.type === type.SET_DETAIL_VALUE) {
        return state.set("detailValue", action.payload)
    }
    // 编辑商品的数据回填
    if (action.type === type.SET_PRODUCTS_DETAIL) {
        // console.log(":::::::::::::", action.payload);
        return state.merge({
            category: action.payload.category._id,
            categoryName: action.payload.category.name,
            name: action.payload.name,
            description: action.payload.description,
            price: action.payload.price,
            stock: action.payload.stock,
            mainImage: action.payload.mainImage,
            images: action.payload.images,
            detail: action.payload.detail
        })
    }
    // 自定义组件验证
    if (action.type === type.SET_MAIN_IMAGE_ERR) {
        return state.merge({
            mainImageErr: "error",
            mainHelp: "请上传封面图片"
        })
    }
    if (action.type === type.SET_IMAGES_ERR) {
        return state.merge({
            imagesErr: "error",
            imagesHelp: "请上传商品图片"
        })
    }
    return state
};

export default reducer