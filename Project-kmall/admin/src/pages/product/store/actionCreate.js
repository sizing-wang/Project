import * as type from "./actionTypes"
import { message } from "antd"
import api from "api/"

// 处理商品列表的展示
const setProductsListAction = (payload) => ({
    type: type.SET_PRODUCTS_LIST,
    payload
})
const setIsLoadingStartAction = () => ({
    type: type.SET_LOADING_START
})
const setIsLoadingEndAction = () => ({
    type: type.SET_LOADING_END
})
export const getProductsListAction = (page, keyword) => {
    return function (dispatch, getState) {
        // 请求之前, 派发action, 加载loading状态
        dispatch(setIsLoadingStartAction());
        let options = {
            page: page
        };
        if (keyword) {
            options.keyword = keyword
        }
        api.getProductsList(options)
            .then(result => {
                // console.log("::::::::", result);
                const data = result.data;
                if (data.code === 0) {
                    dispatch(setProductsListAction(data.data))
                } else {
                    message.error("商品列表获取失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                message.error(err.message)
            })
            .finally(() => {
                // 请求结束后, 取消loading状态
                dispatch(setIsLoadingEndAction())
            })
    }
}

// 处理商品在首页是否显示
export const getIsShowProduct = (id, newShow) => {
    return function (dispatch, getState) {
        const page = getState().get("product").get("current")
        api.getProductsIsShow({
            id: id,
            isShow: newShow,
            page: page
        })
            .then(result => {
                const data = result.data;
                if (data.code === 0) {
                    dispatch(setProductsListAction(data.data));
                    message.success("显示隐藏更新成功")
                } else {
                    message.error("显示隐藏更新失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                message.error(err.message)
            })
    }
}

// 处理商品是否上下架
export const getIsStatusAction = (id, newStatus) => {
    return function (dispatch, getState) {
        const page = getState().get("product").get("current")
        api.getProductsIsStates({
            id: id,
            status: newStatus,
            page: page
        })
            .then(result => {
                // console.log(":::::::", result);
                const data = result.data;
                if (data.code === 0) {
                    dispatch(setProductsListAction(data.data))
                    message.success("上下架更新成功")
                } else {
                    message.error("上下架更新失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                message.error(err.message)
            })
    }
}

// 处理更新是否热卖
export const getIsHotAction = (id, newIsHot) => {
    return function (dispatch, getState) {
        const page = getState().get("product").get("current")
        api.getProductsIsHot({
            id: id,
            isHot: newIsHot,
            page: page
        })
            .then(result => {
                const data = result.data
                if (data.code === 0) {
                    dispatch(setProductsListAction(data.data))
                    message.success("热卖更新成功")
                } else {
                    message.error("更新是否热卖失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                message.error(err.message)
            })
    }
}

// 处理更新排序
export const getIsOrderAction = (id, newOrder) => {
    return function (dispatch, getState) {
        const page = getState().get("product").get("current")
        api.getProductsIsOrder({
            id: id,
            order: newOrder,
            page: page
        })
            .then(result => {
                const data = result.data
                if (data.code === 0) {
                    dispatch(setProductsListAction(data.data))
                    message.success("排序更新成功")
                } else {
                    message.error("排序更新失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                message.error(err.message)
            })
    }
}



// 处理分类数据的回填
const setLevelCategoriesAction = (payload) => ({
    type: type.SET_LEVEL_CATEGORIES,
    payload
});
export const getLevelCategoriesAction = () => {
    return function (dispatch, getState) {
        // 发送ajax请求
        api.setLevelCategory({
            level: 3
        })
            .then(result => {
                // console.log("::::::::", result);
                const data = result.data;
                if (data.code === 0) {
                    dispatch(setLevelCategoriesAction(data.data))
                } else {
                    message.error("获取分类数据失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                message.error(err.messages)
            })
    }
};

// 处理封面图片的数据存储到store
const setMainImage = (payload) => ({
    type: type.SET_MAIN_IMAGE,
    payload
})
export const getMainImageAction = (fileList) => {
    return function (dispatch, getState) {
        dispatch(setMainImage(fileList))
    }
}

// 处理商品图片的数据存储到store
const setImages = (payload) => ({
    type: type.SET_IMAGES,
    payload
})
export const getImagesAction = (images) => {
    return function (dispatch, getState) {
        dispatch(setImages(images))
    }
}

// 处理详情数据存储到store
const setDetailValue = (payload) => ({
    type: type.SET_DETAIL_VALUE,
    payload
})
export const getDetailValueAction = (value) => {
    return function (dispatch, getState) {
        dispatch(setDetailValue(value))
    }
}

// 处理增加商品
const setMainImageErr = () => ({
    type: type.SET_MAIN_IMAGE_ERR
})
const setImagesErr = () => ({
    type: type.SET_IMAGES_ERR
})
export const getProductsAction = (values) => {
    
    return function (dispatch, getState) {
        const state = getState().get("product")
        const mainImage = state.get("mainImage")
        const images = state.get("images")
        const detail = state.get("detailValue")
        // 处理自定义组件的验证
        if (!mainImage) {
            dispatch(setMainImageErr())
        }
        if (!images) {
            dispatch(setImagesErr())
        }

        let request = api.getUpLoadProducts
        if (values.id) {
            request = api.getUpdataProducts
        }
        request({
            ...values,
            mainImage,
            images,
            detail
        })
            .then(result => {
                const data = result.data
                if (data.code === 0) {
                    message.success("操作商品成功", () => {
                        window.location.href = "/product"
                    })
                }
            })
            .catch(err => {
                message.error(err.message)
            })

    }
}


// 处理商品编辑的数据回填
const setProductDetailAction = (payload) => ({
    type: type.SET_PRODUCTS_DETAIL,
    payload
})
export const getProductDetailAction = (productId) => {
    return function (dispatch, getState) {
        // console.log(productId);
            api.getProductsDetail({
                id: productId
            })
                .then(result => {
                    // console.log(":::::::::", result);
                   const data = result.data;

                   if (data.code == 0) {
                        dispatch(setProductDetailAction(data.data))
                   }
                })
                .catch(err => {
                    message.error(err.message)
                })
    }
}
