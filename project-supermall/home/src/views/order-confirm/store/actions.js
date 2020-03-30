// action中可以包含异步操作
import * as type from "./actionsType"
import {Dialog, Notify} from 'vant';

import {
  getSaveAddress,
  getAddressList,
  handleDelAddress,
  getOrderProducts,
  getAddressDetail,
  getEditAddress,
  getOrderConfirm
} from "network/home"

export default {
  // 处理添加收货地址数据
  async [type.GET_SAVE_ADDRESS] ({ commit }, payload) {

    let request = getSaveAddress; // 新增地址
    if (payload.addressId) { // 编辑地址
      request = getEditAddress
    }
    const result = await request(payload);
    const data = result.data;
    if (result.code == 0) {
      if (payload.addressId) {
        Notify({type: "success", message: "编辑地址成功"});
      }
      Notify({type: "success", message: "添加地址成功"});
      // 再次提交最新的登录用户的收获地址列表数据, 渲染页面
      commit(type.GET_ADDRESS_LIST, data)
    } else {
      Dialog({message: "添加地址失败, 请稍后再试 !"})
    }
  },
  // 处理当前登录用户的收货地址列表数据
  async [type.GET_ADDRESS_LIST] ({ commit }) {
    const result = await getAddressList();
    const data = result.data;
    if (result.code == 0) {
      commit(type.GET_ADDRESS_LIST, data)
    } else {
      Dialog({message: "获取地址失败, 请稍后再试 !"})
    }
  },
  // 处理获取生成订单的商品列表
  async [type.GET_ORDER_PRODUCTS] ({ commit }) {
    const result = await getOrderProducts();
    const data = result.data;
    if (result.code == 0) {
      commit(type.GET_ORDER_PRODUCTS, data)
    } else {
      Dialog({message: "获取订单商品列表失败, 请稍后再试 !"})
    }
  },
  // 处理删除选中的收货地址
  async [type.HANDLE_DELETE_ADDRESS] ({ commit }, payload) {
    const result = await handleDelAddress(payload);
    const data = result.data;
    if (result.code == 0) {
      Notify({type: "success", message: "删除地址成功"});
      // 再次提交最新的登录用户的收获地址列表数据, 渲染页面
      commit(type.GET_ADDRESS_LIST, data)
    } else {
      Dialog({message: "获取地址失败, 请稍后再试 !"})
    }
  },
  // 处理当前收货地址的详情信息
  async [type.GET_ADDRESS_DETAIL] ({ commit }, payload) {
    const result = await getAddressDetail(payload);
    const data = result.data;
    if (result.code == 0) {
      commit(type.GET_ADDRESS_DETAIL, data)
    } else {
      Dialog({message: "获取地址详情失败, 请稍后再试 !"})
    }
  },
  // 创建订单, 进行支付
  async [type.GET_ORDER_CONFIRM] ({ commit }, payload) {
    const result = await getOrderConfirm(payload);
    console.log("::::::::::",result);
  }

}
