import * as type from "./actionTypes"
import { fromJS } from "immutable"

// 将当前组件中的state数据转换成immutable类型对象 (map对象)
// 如果修改了immutable对象中的属性, 那么会返回一个新的immutable类型对象
let defaultState = fromJS({
    userNum: 0,
    orderNum: 0,
    productNum: 0
});

let reducer = (state = defaultState, action) => {
    if (type.GET_COUNTS === action.type) {
        // console.log("-----", action.payload);
        let result = action.payload;
        // console.log(result);
        if (result.code === 0) {
            return state.merge({
                userNum: result.data.usernum,
                orderNum: result.data.ordernum,
                productNum: result.data.productnum
            })
        }
    }
    return state
};

export default reducer