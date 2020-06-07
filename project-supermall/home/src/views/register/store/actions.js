// action中可以包含异步操作
// import * as type from "./actionsType"
import * as type from "./actionsType"
import {Dialog, Notify} from 'vant';

import {
  getCaptcha,
  getVerifyCode,
  userRegister
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
  // 处理获取短信验证码
  async [type.GET_VERIFY_CODE] ({ commit }, payload) {
    const result = await getVerifyCode(payload);
    if (result.code == 0) {
      // 显示验证码已发送提示信息
      Notify({ type: 'success', message: result.message })
    } else {
      Dialog({message: result.message})
    }
  },
  // 处理用户注册
  async [type.GET_USER_REGISTER] ({ commit }, payload) {
    const result = await userRegister(payload);
    if (result.code == 0) {
      // 显示注册成功提示信息
      Notify({ type: 'success', message: result.message });
      window.location = "/login";
    } else {
      Dialog({message: "数据加载失败, 请稍后再试 !"})
    }
  },
}
