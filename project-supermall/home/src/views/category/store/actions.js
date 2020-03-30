// action中可以包含异步操作
import * as type from "./actionsType"
import { Dialog } from 'vant';

import {
  getFloorsData
} from "network/home"

export default {
  // 处理楼层商品数据
  async [type.GET_FLOORS] ({ commit }) {
    const result = await getFloorsData();
    const data = result.data;
    if (result.code == 0) {
      commit(type.GET_FLOORS, data)
    } else {
      Dialog({message: "数据加载失败, 请稍后再试 !"})
    }
  },
}
