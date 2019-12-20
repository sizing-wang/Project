import { combineReducers } from "redux-immutable"
import { reducer as loginReducer } from "pages/login/store/store"
import { reducer as homeReducer } from "pages/home/store/store"
import { reducer as userReducer } from "pages/user/store/store"
import { reducer as categoryReducer } from "pages/category/store/store"
import { reducer as productReducer } from "pages/product/store/store"

export default combineReducers({
    login: loginReducer,
    home: homeReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer
})