import * as type from "./actionTypes"
import { message, Result } from "antd"
import api from "api/"

// 处理增加属性
export const handleAddAttrAction = (values) => {
    return function (dispatch, getState) {
        // 发送请求, 将数据插入数据库中
        api.getAddAttr(values)
        .then(result => {
            // console.log(":::::::::", result);
            const data = result.data
            if (data.code == 0) {
                message.success(data.message, () => {
                    window.location.href = "/attr"
                })
            } else {
                message.error("新增属性失败, 请刷新再试 !")
            }
        })
        .catch(err => {
            message.error(err.message)
        })
    }
}

// isloading图标开始
const isLoadingStart = () => ({
    type: type.ISLOADING_START
})
// isLoading图标结束
const isLoadingEnd = () => ({
    type: type.ISLOADING_END
})
// 将商品属性, 存储到store中
const getAttrList = (payload) => ({
    type: type.GET_ATTR_LIST,
    payload
})
// 处理获取商品属性列表数据
export const handleGetAttrsAction = (page) => {
    return function (dispatch, getState) {
        // 派发action, 显示loading图标
        dispatch(isLoadingStart())
        // 发送请求, 获取商品属性数据
        api.getAttrList({page})
        .then(result => {
            // console.log("::::::::::", result);
            const data = result.data
            if (data.code == 0) {
                // 派发action, 将数据存储到store
                dispatch(getAttrList(data.data))
            } else {
                message.error("获取商品属性失败, 请刷新再试 !")
            }
        })
        .catch(err => {
            message.error(err.message)
        })
        .finally(() => {
            // 请求结束后, 派发action, 取消isLoading图标
            dispatch(isLoadingEnd())
        })
    }
}

// 处理商品属性排序
const upDataAttrOrder = (payload) => ({
    type: type.UPDATE_ATTR_ORDER,
    payload
})
export const handleAttrOrderAction = (order, id) => {
    return function (dispatch, getState) {
        // 发送请求, 改变商品属性排序序号
        // console.log(":::::::::", getState().get("attr").get("current"));
        const page = getState().get("attr").get("current")
        api.getUpDateAttrOrder({
            order,
            id,
            page
        })
        .then(result => {
            // console.log("--------", result);
            const data = result.data
            if (data.code == 0) {
                // 派发action, 获取最新的属性列表数据
                dispatch(getAttrList(data.data))
                message.success("排序成功")
            } else {
                message.error("商品属性排序失败, 请刷新再试 !")
            }
        })
        .catch(err => {
            message.error(err.message)
        })
        
    }
}

// 处理商品属性的数据回填
const getAttrsDetail = (payload) => ({
    type: type.GET_ATTR_DETAIL,
    payload
})
export const handleAttrDetailAction = (id) => {
    return function (dispatch, getState) {
        // 发送请求, 根据当前属性id, 获取对应详情信息
        api.getAttrDetail({id})
        .then(result => {
            // console.log("::::::::::", result);
            const data = result.data
            if (data.code == 0) {
                // 派发action, 将属性的详情信息数据, 存储到store
                dispatch(getAttrsDetail(data.data))
                // console.log("::::::::", data.data);
                
            } else {
                message.error("属性详情信息获取失败, 请刷新再试 !")
            }
        })
        .catch(err => {
            message.error(err.message)
        })
        
    }
}

// 处理商品属性的修改
export const handleAttrDetailPutAction = (id, values) => {
    return function (dispatch, getState) {
        // 发送请求, 获取修改之后的商品属性数据
        // console.log("::::::::::::::", values);
        const { name, key, value } = values
        api.getAttrDetailPut({
            id,
            name,
            key,
            value
        })
        .then(result => {
            // console.log("::::::::::", result);
            const data = result.data
            if (data.code == 0) {
                // 派发action, 重新获取最新的商品属性列表数据
                message.success("属性修改成功", () => {
                    window.location.href = "/attr"
                })
            }
        })
        .catch(err => {
            message.error(err.message)
        })
    }
}



