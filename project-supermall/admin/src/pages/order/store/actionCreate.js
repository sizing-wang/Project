import * as type from "./actionTypes"
import { message } from "antd"
import api from "api/"

// 处理订单列表展现
const setOrderListAction = (payload) => ({
    type: type.GET_ORDER_LIST,
    payload
})
const setIsLoadingStart = () => ({
    type: type.SET_ISLOADING_START
})
const setIsLoadingEnd = () => ({
    type: type.SET_ISLOADING_END
})
export const getOrderListAction = (page) => {
    return function (dispatch, getState) {
        // 发送请求前, 显示loading图标
        dispatch(setIsLoadingStart())
        // 发送请求, 获取订单列表数据
            api.getOrderList({page})
            .then(result => {
                    let data = result.data
                    if (data.code === 0) {                       
                        // 派发action, 处理订单列表数据
                        dispatch(setOrderListAction(data.data))
                    } else {
                        message.error("获取订单列表失败, 请稍后再试!!!")
                    }
            })
            .catch(err => {
                message.error(err.message)
            })
            .finally(() => {
                // 请求结束, 取消加载状态
                dispatch(setIsLoadingEnd())
            })
    }
}

// 处理订单详情数据
const setOrderDetail = (payload) => ({
      type: type.GET_ORDER_DETAIL,
      payload
})
export const handleOrderDetailsAction = (orderNo) => {
    return function (dispatch, getState) {
        // 加载loading图标开始
        dispatch(setIsLoadingStart())
        // 发送请求, 获取订单详情数据
        api.getOrderDetail({orderNo})
        .then(result => {
            // console.log("----------", result); 
            const orderDetail = result.data
            if (orderDetail.code == 0) {
                // 派发action, 传递订单详情数据
                dispatch(setOrderDetail(orderDetail.data))
            } else {
                message.error('订单加载失败,请稍后在试')
            }
        })
        .catch(error => {
            message.error(error.message)
        })
        .finally(() => {
            // 取消loading图标
            dispatch(setIsLoadingEnd())
        })
    }
}
