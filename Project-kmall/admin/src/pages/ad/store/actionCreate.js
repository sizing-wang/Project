import * as type from "./actionTypes"
import { message } from "antd"
import api from "api/"

// 处理将广告图片数据存储到store
const setAdImageAction = (payload) => ({
    type: type.SET_AD_IMAGE,
    payload
});
export const getAdImageAction = (fileList) => {
    return function (dispatch, getState) {
        dispatch(setAdImageAction(fileList))
    }
};

// 处理新增广告
const setAdImageErr = () => ({
    type: type.SET_ADIMAGE_ERR
})
export const getSaveAdAction = (values, err) => {
    return function (dispatch, getState) {
        // 验证数据合法性
        let state = getState().get("ad");
        let image = state.get("image");
        // console.log("----------", image);
        if (!image) {
            dispatch(setAdImageErr());
            return
        }
        // 发送ajax, 新增广告
        api.getSaveAd({
            ...values,
            image
        })
            .then(result => {
                // console.log(result);
                let data = result.data;
                if (data.code === 0) {
                    message.success(data.message, () => {
                        window.location.href = "/ad"
                    })
                }
            })
            .catch(err => {
                message.error(err.message)
            })
    }
}

// 处理广告图片列表展示
const setAdPagesAction = (payload) => ({
    type: type.SET_AD_PAGES,
    payload
});
const setIsLoadingStart = () => ({
    type: type.SET_ISLOADING_START
});
const setIsLoadingEnd = () => ({
    type: type.SET_ISLOADING_END
})
export const getAdImageListAction = (page) => {
    return function (dispatch, getState) {
        // 请求广告列表数据之前, 派发action, 显示loading状态
        dispatch(setIsLoadingStart());
        // 发送ajax, 获取广告列表数据
        api.getAdList({page})
            .then(result => {
                // console.log(result);
                let data = result.data;
                if (data.code === 0) {
                    // 派发action, 传递分页数据
                    dispatch(setAdPagesAction(data.data));
                } else {
                    message.error("获取广告列表失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                message.error(err.message)
            })
            .finally(() => {
                // 请求结束, 取消loading状态
                dispatch(setIsLoadingEnd())
            })
    }
}

// 处理广告图片的显示/隐藏
export const getAdIsShowAction = (id, newIsShow) => {
    return function (dispatch, getState) {
        // 发送ajax, 更新显示隐藏
        let state = getState().get("ad");
        let page = state.get("current");
        // console.log("--------", page);
        api.getAdIsShow({
            id: id,
            isShow: newIsShow,
            page: page
        })
            .then(result => {
                // console.log("--------", result);
                let data = result.data;
                if (data.code === 0) {
                    // console.log("---------", data.data);
                    dispatch(setAdPagesAction(data.data));
                    message.success("更新显示隐藏成功")
                } else {
                    message.error("更新显示隐藏失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                message.error(err.message)
            })
    }
}

// 处理广告更新排序
export const getAdOrderAction = (id, newOrder) => {
    return function (dispatch, getState) {
        const state = getState().get("ad");
        const page = state.get("current");
        // 发送ajax, 处理更新排序
        api.getAdOrder({
            id: id,
            order: newOrder,
            page: page
        })
            .then(result => {
                // console.log(":::::::::", result);
                const data = result.data;
                if (data.code === 0) {
                    dispatch(setAdPagesAction(data.data));
                    message.success("更新排序成功")
                } else {
                    message.error("更新排序失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                message.error(err.message)
            })
    }
};

// 处理广告数据的回填
const setAdDetailAction = (payload) => ({
    type: type.SET_AD_DETAIL,
    payload
})
export const getAdDetailAction = (id) => {
    return function (dispatch, getState) {
        // 发送ajax
        api.getAdDetail({id})
            .then(result => {
                // console.log("::::::::::", result);
                // return
                const data = result.data;
                if (data.code === 0) {
                    // 派发action, 将数据存储到store中
                    dispatch(setAdDetailAction(data.data))
                } else {
                    message.error("数据获取失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                message.error(err.message)
            })
    }
};

// 处理更新广告图片
export const getAdUpDataAction = (id, values) => {
    return function (dispatch, getState) {
        // 获取数据
        const state = getState().get("ad");
        const image = state.get("image");
        // 发送ajax
        api.getAdUpData({
            id,
            ...values,
            image
        })
            .then(result => {
                // console.log(":::::::::", result);
                const data = result.data;
                if (data.code === 0) {
                    message.success(data.message, () => {
                        window.location.href = "/ad"
                    })
                } else {
                    message.error("更新失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                message.error(err.message)
            })
    }
}


/*
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
                    dispatch(setProductsListAction(data.data))
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
*/
