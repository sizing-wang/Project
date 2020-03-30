// action中可以包含异步操作
import * as type from "./actionsType"
import moment from "moment";
import {Dialog, Notify} from 'vant';

import {
  getOrderList
} from "network/home"

export default {
  // 处理当前登录用户的订单列表数据
  async [type.GET_ORDER_LIST] ({ commit }) {
    const result = await getOrderList();
    const data = result.data;
    data.list.forEach(item => { // 格式化时间
      item.createdAt = moment(item.createdAt).format("YYYY-MM-DD HH:MM:SS");
    })
    if (result.code == 0) {
      commit(type.GET_ORDER_LIST, data)
    } else {
      Dialog({message: "获取订单列表失败, 请稍后再试 !"})
    }
  }
}
