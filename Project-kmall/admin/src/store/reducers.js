import { combineReducers } from "redux"
import { reducer as todoListReducer } from "../pages/todoList/store/store"

export default combineReducers({
    todoList: todoListReducer
})