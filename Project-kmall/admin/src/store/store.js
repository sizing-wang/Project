// applyMiddleware 派发action时可以处理异步任务(ajax请求) 配合redux-thunk使用
import { createStore, applyMiddleware } from "redux"
import reducers from "./reducers";
import thunk from 'redux-thunk';
import { logger } from "redux-logger"

const middlewares = [];
middlewares.push(thunk);
if (process.env.NODE_ENV === `development`) {
    middlewares.push(logger);
}


let store = createStore(reducers, applyMiddleware(...middlewares));
export default store