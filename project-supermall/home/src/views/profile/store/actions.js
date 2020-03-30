// action中可以包含异步操作
import * as type from "./actionsType"
import {Dialog, Notify} from 'vant';

import {
  getLogout
} from "network/home"

export default {
  // 处理获取购物车商品数据
  async [type.GET_USER_LOGOUT] ({ commit }) {
    const result = await getLogout();
    if (result.code == 0) {
      // 删除前台存储的用户信息
      delete localStorage.token;
      window.location.href = "/"
    } else {
      Dialog({message: "用户退出失败, 请稍后再试 !"})
    }
  }

}
