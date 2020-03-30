// action中可以包含异步操作
import * as type from "./actionsType"
import { Dialog } from 'vant';

import {
  getProductDetail
} from "network/home"
import updateSize from "swiper/src/components/core/update/updateSize";

export default {
  // 处理商品详情数据
  async [type.GET_PRODUCT_DETAIL] ({commit}, payload) {
    const id = payload.productId;
    const result = await getProductDetail(id);
    const data = result.data;
    data.images = data.images.split(",");
    if (result.code == 0 && data.images.length > 0) {
      commit(type.GET_PRODUCT_DETAIL, data)
    } else {
      Dialog({message: "数据加载失败, 请稍后再试 !"})
    }
  }
}
