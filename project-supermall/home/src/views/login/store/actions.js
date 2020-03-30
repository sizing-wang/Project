// action中可以包含异步操作
import * as type from "./actionsType"
import {Dialog, Notify} from 'vant';

import {
  getCaptcha,
  userLogin
} from "network/home"

export default {
  // 处理获取图形验证码
  async [type.GET_CAPTCHA] ({ commit }) {
    const result = await getCaptcha();
    const data = result.data;
    if (result.code == 0) {
      commit(type.GET_CAPTCHA, data)
    } else {
      Dialog({message: "图形验证码加载失败, 请稍后再试 !"})
    }
  },
  // 处理保存路由地址
  async [type.GET_REDIRECT_PATH] ({ commit }, payload) {
    commit(type.GET_REDIRECT_PATH, payload)
  },
  // 处理用户登录
  async [type.GET_USER_LOGIN] ({ commit }, payload) {
    const redirect = this.state.login.redirect.redirect || "/";
    const result = await userLogin(payload);
    if (result.code == 0) {
      const username = result.data.username;
      // 将登录用户信息存储到前台页面中
      localStorage.token = username;
      commit(type.GET_USER_LOGIN, username);
      Notify({type: 'success', message: "登陆成功"});
      // 跳转到刚才页面
      window.location.href = redirect
    } else {
      Dialog({message: result.message})
    }
  }
}
