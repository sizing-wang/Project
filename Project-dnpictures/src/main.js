import Vue from 'vue'
import App from './App'
import request from "./utils/request";

Vue.config.productionTip = false
// 将封装的request方法, 添加到Vue原型上, 方便使用
Vue.prototype.request = request

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
