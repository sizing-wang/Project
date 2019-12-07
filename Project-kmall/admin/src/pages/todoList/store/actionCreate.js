import * as type from "./actionTypes"
import axios from "axios"

export const getChangeItemAction = (task) => ({
    type: type.CHANGE_ITEM,
    payload: task
});
export const getAddItemAction = () => ({
    type: type.ADD_ITEM
});
export const getDelItemAction = (index) => ({
    type: type.DEL_ITEM,
    payload: index
});

const getLoadInitAction = (data) => ({
    type: type.LOAD_ITEM,
    payload: data
});

export const getLoadInitActions = () => {
    return function (dispatch, getState) {
        axios.get("http://127.0.0.1:3000")
            .then(result => {
                // 派发action
                dispatch(getLoadInitAction(result.data))
            })
            .catch(err => {
                console.log(err);
            })
    }


};