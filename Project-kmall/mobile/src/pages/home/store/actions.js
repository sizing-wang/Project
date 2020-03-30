// action中可以包含异步操作
import * as type from "./actionsType"
import api from "api/"

export default {
   async [type.GET_ADS] ({ commit }) {
        // 发送请求, 获取数据
        const result = await api.getHomeAds()
        const data = result.data
        if (data.code == 0) {
         commit(type.GET_ADS, data)   
        } else {
           alert("请求失败, 请稍后再试!!!")
        }
   },
   async [type.GET_FLOORS] ({ commit }) {
         const result = await api.getFloors()
         const floors = result.data
         if (floors.code == 0) {
            commit(type.GET_FLOORS, floors)
         } else {
             alert("请求失败, 请稍后再试 !")
         }
   }
}