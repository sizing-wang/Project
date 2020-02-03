// mutation必须是同步函数; 唯一更改state中数据的方法
import * as type from "./actionsType"
export default {
    [type.GET_ADS] (state, payload) {     
        state.ads = payload.data
    },
    [type.GET_FLOORS] (state, payload) {
        state.floors = payload.data
    }
}