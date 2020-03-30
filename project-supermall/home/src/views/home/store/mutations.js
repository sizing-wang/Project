// mutation必须是同步函数; 唯一更改state中数据的方法
import * as type from "./actionsType"
export default {
    [type.GET_SEARCH] (state, payload) {
      state.keywordData = payload;
    },
    [type.GET_ADS] (state, payload) {
      state.ads = payload
    },
    [type.GET_CATEGORY] (state, payload) {
      state.categories = payload
    },
    [type.GET_HOT] (state, payload) {
      state.hot = payload
    },
    [type.GET_FLOORS] (state, payload) {
        state.floors = payload
    },
    [type.GET_PRODUCT_DETAIL] (state, payload) {
        state.productSku = payload
    }
}
