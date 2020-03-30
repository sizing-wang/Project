// mutation必须是同步函数; 唯一更改state中数据的方法
import * as type from "./actionsType"
export default {
    [type.GET_ORDER_DETAIL] (state, payload) {
      state.orderDetail = payload
    }
}
