// action中可以包含异步操作
import * as type from "./actionsType"
import moment from "moment";
import {Dialog, Notify} from 'vant';

import {
  getOrderDetail
} from "network/home"

export default {
  // 处理当前订单的详情数据
  async [type.GET_ORDER_DETAIL] ({ commit }, payload) {
    const result = await getOrderDetail(payload);
    const data = result.data;
    data.createdAt = moment(data.createdAt).format("YYYY-MM-DD HH:MM:SS")
    if (result.code == 0) {
      commit(type.GET_ORDER_DETAIL, data)
    } else {
      Dialog({message: "获取订单详情失败, 请稍后再试 !"})
    }
  }
}
