// mutation必须是同步函数; 唯一更改state中数据的方法
import * as type from "./actionsType"
export default {
    [type.GET_CAPTCHA] (state, payload) {
        state.captchaCode = payload
    },
    [type.GET_REDIRECT_PATH] (state, payload) {
      state.redirect = payload
    },
    [type.GET_USER_LOGIN] (state, payload) {
      state.username = payload
    }
}
