// action中可以包含异步操作
import * as type from "./actionsType"
import { Dialog } from 'vant';

import {
  getSearchData,
  getHomeCarouselData,
  getHomeCategoryData,
  getHomeHotData,
  getFloorsData,
  getProductDetail
} from "network/home"

export default {
  // 处理搜索数据
  async [type.GET_SEARCH] ({ commit }, payload) {
    const keyword = payload.keyword;
    // 发送请求, 获取数据
    const result = await getSearchData(keyword);
    const data = result.data;
    if (result.code == 0) {
      commit(type.GET_SEARCH, data)
    } else {
      Dialog({message: "数据加载失败, 请稍后再试 !"})
    }
  },
  // 处理轮播图
   async [type.GET_ADS] ({ commit }) {
     // 发送请求, 获取数据
     const result = await getHomeCarouselData();
     const data = result.data;
     if (result.code == 0) {
       commit(type.GET_ADS, data)
      } else {
        Dialog({message: "数据加载失败, 请稍后再试 !"})
      }
   },
  // 处理商品分类选项卡
   async [type.GET_CATEGORY] ({ commit }) {
      // 发送请求, 获取数据
      const result = await getHomeCategoryData();
      const data = result.data;
      if (result.code == 0) {
         commit(type.GET_CATEGORY, data)
      } else {
        Dialog({message: "数据加载失败, 请稍后再试 !"})
      }
   },
  // 处理首页热卖商品
  async [type.GET_HOT] ({commit}) {
    const result = await getHomeHotData();
    const data = result.data;
    if (result.code == 0) {
      commit(type.GET_HOT, data)
    } else {
      Dialog({message: "数据加载失败, 请稍后再试 !"})
    }
  },
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
  // 处理商品规格的数据
  async [type.GET_PRODUCT_DETAIL] ({commit}, payload) {
    const id = payload.productId;
    const result = await getProductDetail(id);
    const data = result.data;
    if (result.code == 0) {
      commit(type.GET_PRODUCT_DETAIL, data)
    } else {
      Dialog({message: "数据加载失败, 请稍后再试 !"})
    }
  }
}
