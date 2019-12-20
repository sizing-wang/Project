import * as type from "./actionTypes"
import { message } from "antd"
import api from "api/"

const setLevelCategoriesAction = (payload) => ({
    type: type.SET_LEVEL_CATEGORIES,
    payload
});


// 处理新增根分类数据
export const getCategoriesAction = (values) => {
    return function (dispatch, getState) {
        // 发送ajax请求
        api.addCategory(values)
            .then(result => {
                // console.log("--------", result);
                const data = result.data;
                // console.log(data)
                if (data.code === 0) {
                    // 派发action
                    dispatch(setLevelCategoriesAction(data.data));
                    message.success("新增分类成功")
                } else {
                    message.error("分类数据回填失败, 请稍后再试!!!")
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

};

// 处理分类数据的回填
export const getLevelCategories = () => {
    return function (dispatch, getState) {
        // 发送ajax请求
        api.setLevelCategory({
            level: 2
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

// 处理分类名称列表
let timer;
export const getPageAction = (page) => {
    return function (dispatch, getState) {
        // 发送请求前, 派发loading状态action
        dispatch(getPageLoadingStart());
        // 发送ajax请求
        /*
        timer = setTimeout(() => {
            api.getCategoriesList({
                page: page
            })
                .then(result => {
                    // console.log("--------", result.data);
                    let data = result.data;
                    if (data.code === 0) {
                        dispatch(getSetPageAction(result.data.data))
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    // 请求结束后, 派发取消loading状态的action
                    dispatch(getPageLoadingEnd())
                })
        }, 500)
        */

        api.getCategoriesList({
            page: page
        })
            .then(result => {
                // console.log("--------", result.data);
                let data = result.data;
                if (data.code === 0) {
                    dispatch(getSetPageAction(result.data.data))
                }
            })
            .catch(err => {
                console.log(err);
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
                console.log(err);
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

const clearSetTimerOut = (payload) => ({
    type: type.CLEAR_SETTIMEROUT,
    payload
})
// 处理清除定时器
export const getClearSetTimerOut = () => {
    return function (dispatch, getState) {
        // 派发action, 清除定时器
        dispatch(clearSetTimerOut(timer))
    }
}



