// store 的计算属性
export default {
    captchaCode (state) {
      if (state.captchaCode) {
         return state.captchaCode
      }
    },
    redirect (state) {
      if (state.redirect) {
        return state.redirect
      }
    },
    username (state) {
      if (state.username) {
        return state.username
      }
    }
}
