// mutation必须是同步函数; 唯一更改state中数据的方法
import * as type from "../store/actionsType"
export default {
    [type.ADD_TODO] (state, todo) {
        state.todos.unshift(todo)
    },
    [type.DEL_TODO] (state, index) {
        state.todos.splice(index, 1)
    },
    [type.SELECT_ALL_DONE] (state, value) {
        state.todos.forEach(function (item, index) {
            item.done = value
        });
    }
}