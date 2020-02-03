// action中可以包含异步操作
import * as type from "../store/actionsType"
export default {
    [type.ADD_TODO] ({ commit }, todo) {
        commit(type.ADD_TODO, todo)
    },
    [type.DEL_TODO] ({ commit }, index) {
        commit(type.DEL_TODO, index)
    },
    [type.SELECT_ALL_DONE] ({ commit }, value) {
        commit(type.SELECT_ALL_DONE, value)
    }
}