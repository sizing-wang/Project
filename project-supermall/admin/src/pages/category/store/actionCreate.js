import * as type from "./actionTypes"
import { message } from "antd"
import api from "api/"

// 处理新增/编辑根分类数据
export const getCategoriesAction = (values) => {
    return function (dispatch, getState) {
        // 添加手机图标数据参数
        values.id ? values.icon = getState().get("category").get("icon")
            :
        values.icon = getState().get("category").get("mobileImage");
        // 发送ajax请求
        let request = api.addCategory;
        if (values.id) {
            request = api.upDateCategory
        }
        request(values)
            .then(result => {
                // console.log("--------", result);
                const data = result.data;
                if (data.code === 0) {
                    // 派发action
                    // dispatch(setLevelCategoriesAction(data.data));
                    if (values.id) {
                        message.success("编辑分类成功", () => {
                            window.location.href = "/category"
                        })
                    } else {
                        message.success("新增分类成功", () => {
                            window.location.href = "/category"
                        })
                    }
                } else {
                    message.error("获取分类数据失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                message.error(err)
            })
    }

};

// 处理选择根分类数据的回填
const setLevelCategoriesAction = (payload) => ({
    type: type.SET_LEVEL_CATEGORIES,
    payload
});
export const getLevelCategories = () => {
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
                    message.error("根分类数据回填失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                message.error(err.messages)
            })
    }
};

// 处理分类名称列表
const getSetPageAction = (payload) => ({
    type: type.SET_PAGE,
    payload
});
const getPageLoadingStart = () => ({
    type: type.SET_LOADING_START
});
const getPageLoadingEnd = () => ({
    type: type.SET_LOADING_END
});
export const getPageAction = (page) => {
    return function (dispatch, getState) {
        // 发送请求前, 派发loading状态action
        dispatch(getPageLoadingStart());
        // 发送ajax请求
        api.getCategoriesList({
            page: page
        })
            .then(result => {
                // console.log("--------", result.data);
                let data = result.data;
                if (data.code === 0) {
                    dispatch(getSetPageAction(data.data))
                }
            })
            .catch(err => {
                message.error("分类名称列表加载失败, 请稍后再试!!!")
            })
            .finally(() => {
                // 请求结束后, 派发取消loading状态的action
                dispatch(getPageLoadingEnd())
            })

    }

};

// 处理更改分类名称
export const getUpdateAction = (id, newName) => {
    return function (dispatch, getState) {
        const page = getState().get("category").get("current");
        // 发送ajax请求
        api.getUpdateNameCategory({
            id: id,
            name: newName,
            page: page
        })
            .then(result => {
                // console.log("--------", result);
                let data = result.data;
                if (data.code === 0) {
                    // 获取当前页数据
                    dispatch(getSetPageAction(result.data.data));
                    message.success("分类名称更新成功")
                } else {
                    message.error("分类名称更新失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                message.error("分类名称更新失败, 请稍后再试!!!")
            })
    }

};

// 处理更改手机分类名称
export const UpdateMobileNameAction = (id, newMobileName) => {
    return function (dispatch, getState) {
        const page = getState().get("category").get("current");
        // 发送ajax请求
        api.getUpdateMobileNameCategory({
            id: id,
            mobileName: newMobileName,
            page: page
        })
            .then(result => {
                // console.log("--------", result);
                let data = result.data;
                if (data.code === 0) {
                    // 获取当前页数据
                    dispatch(getSetPageAction(result.data.data));
                    message.success("手机分类名称更新成功")
                } else {
                    message.error("手机分类名称更新失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

};

// 处理更改排序
export const UpdateOrderAction = (id, newOrder) => {
    return function (dispatch, getState) {
        const page = getState().get("category").get("current");
        // 发送ajax请求
        api.getUpdateOrderCategory({
            id: id,
            order: newOrder,
            page: page
        })
            .then(result => {
                // console.log("--------", result);
                let data = result.data;
                if (data.code === 0) {
                    // 获取当前页数据
                    dispatch(getSetPageAction(result.data.data));
                    message.success("排序更新成功")
                } else {
                    message.error("排序更新失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

};

// 处理显示隐藏分类
export const UpdateIsShowAction = (id, newIsShow) => {
    return function (dispatch, getState) {
        const page = getState().get("category").get("current");
        // 发送ajax请求
        api.getUpdateIsShowCategory({
            id: id,
            isShow: newIsShow,
            page: page
        })
            .then(result => {
                // console.log("--------", result);
                let data = result.data;
                if (data.code === 0) {
                    // 获取当前页数据
                    dispatch(getSetPageAction(result.data.data));
                    message.success("显示隐藏更新成功")
                } else {
                    message.error("显示隐藏更新失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

};

// 处理手机图标数据
const setMobileImage = (payload) => ({
    type: type.SET_MOBILE_IMAGE,
    payload
})
export const handleMobileImageAction = (mobileImage) => {
    return function (dispatch, getState) {
        // 派发action, 将手机图标数据存储到store中
        dispatch(setMobileImage(mobileImage))
    }
}

// 处理分类数据的回填
const setCategoryDetail = (payload) => ({
    type: type.SET_CATEGORY_DETAIL,
    payload
})
export const handleCategoryDetailAction = (id) => {
    return function (dispatch, getState) {
        // 发送请求, 获取相对应分类数据
        api.getCategoryDetail({id})
            .then(result => {
                const categoryDetail = result.data;
                // console.log("::::::::::::", categoryDetail);
                if (categoryDetail.code === 0) {
                    // 派发action, 将获取到的分类详情数据存储到store中
                    dispatch(setCategoryDetail(categoryDetail.data))
                }
            })
            .catch(err => {
                message.error(err.onmessage)
            })
    }
}

// 处理更新是否为楼层
export const UpDateIsFloorAction = (id, isFloor) => {
    return function (dispatch, getState) {
        const page = getState().get("category").get("current");
        // 发送请求, 更新是否为楼层
        api.getUpDateIsFloor({id, isFloor, page})
            .then(result => {
                // console.log(result)
                const data = result.data;
                if (data.code == 0) {
                    dispatch(getSetPageAction(data.data));
                    message.success("操作成功")
                } else {
                    message.error("更新是否为楼层失败, 请稍后在试 !")
                }
            })
            .catch(err => {
                message.error("操作失败, 刷新再试 !")
            })
    }
}


