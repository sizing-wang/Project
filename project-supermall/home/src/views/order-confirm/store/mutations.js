// mutation必须是同步函数; 唯一更改state中数据的方法
import * as type from "./actionsType"
export default {
    [type.GET_ADDRESS_LIST] (state, payload) {
      state.addressList = payload
    },
    [type.GET_ORDER_PRODUCTS] (state, payload) {
      state.orderProducts = payload
    },
    [type.GET_ADDRESS_DETAIL] (state, payload) {
      state.addressDetail = payload
    }
}
