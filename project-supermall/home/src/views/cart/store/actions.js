// action中可以包含异步操作
import * as type from "./actionsType"
import {Dialog, Notify} from 'vant';

import {
  getCarts,
  getChoices,
  getDeleteProduct
} from "network/home"

export default {
  // 处理获取购物车商品数据
  async [type.GET_CARTS] ({ commit }) {
    const result = await getCarts();
    const data = result.data;
    if (result.code == 0) {
      commit(type.GET_CARTS, data)
    } else if (result.code == 10) {
      Dialog({message: "请重新登录"})
    } else {
      Dialog({message: "获取购物车数据失败, 请稍后再试 !"})
    }
  },
  // 处理选中不选中状态数据
  async [type.GET_CHOICES] ({ commit }, payload) {
    const result = await getChoices(payload);
    const data = result.data;
    if (result.code == 0) {
      commit(type.GET_CARTS, data)
    } else {
      Dialog({message: "操作失败, 请稍后再试 !"})
    }
  },
  // 处理删除选中的购物车商品
  async [type.GET_DELETE_PRODUCT] ({ commit }, payload) {
    const result = await getDeleteProduct(payload);
    const data = result.data;
    if (result.code == 0) {
      commit(type.GET_CARTS, data)
    } else {
      Dialog({message: "删除商品失败, 请稍后再试 !"})
    }
  }
}
