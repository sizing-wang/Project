import * as type from "./actionTypes"
import { fromJS } from "immutable"


// 将当前组件中的state数据转换成immutable类型对象 (map对象)
// 如果修改了immutable对象中的属性, 那么会返回一个新的immutable类型对象
let defaultState = fromJS({
    
});

let reducer = (state = defaultState, action) => {

    return state
};

export default reducer