import * as type from "./actionTypes"
import { fromJS } from "immutable"

// 将当前组件中的state数据转换成immutable类型对象 (map对象)
// 如果修改了immutable对象中的属性, 那么会返回一个新的immutable类型对象
let defaultState = fromJS({
    lists: ["吃饭", "睡觉", "打豆豆", "狂敲代码", "头条", "玩游戏"],
    task: ""
});

let reducer = (state = defaultState, action) => {
    if (action.type === type.CHANGE_ITEM) {
        // 更新数据
        /*
        const newState = JSON.parse(JSON.stringify(state));
        newState.task = action.payload;
        return newState;
         */
        return state.set("task", action.payload)
    }
    if (action.type === type.ADD_ITEM) {
        // 更新数据
        /*
        const newState = JSON.parse(JSON.stringify(state));
        newState.lists.push(newState.task);
        newState.task = "";
        return newState
         */
        // console.log("ADD::: ", state);
        let lists = [...state.get("lists")];
        lists.push(state.get("task"));
        return state.merge({
            lists,
            task: ""
        })
    }
    if (action.type === type.DEL_ITEM) {
        // 更新数据
        /*
        const newState = JSON.parse(JSON.stringify(state));
        newState.lists.splice(action.payload, 1);
        return newState
         */
        let lists = [...state.get("lists")];
        lists.splice(action.payload, 1);
        return state.set("lists", lists)
    }
    if (action.type === type.LOAD_ITEM) {
        // 更新数据
        /*
        const newState = JSON.parse(JSON.stringify(state));
        newState.lists = action.payload;
        return newState
         */
        return state.set("lists", action.payload)
    }
    return state
};

export default reducer