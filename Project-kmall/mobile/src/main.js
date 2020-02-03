import Vue from 'vue'
import App from './App.vue'

// 管理全局store中的数据
import store from "./store"

// 加载css共同样式
import "./assets/css/common.css"

// 引入全局路由
import router from "./router"

// 注册全局过滤器
import filters from "./filters"
// Obiect.keys ：遍历对象，取出每一项放进一个数组中
Object.keys(filters).forEach((filter, index) => {
    Vue.filter(filter, filters[filter])
})


// 引入组件库(插件)
import "./plugins/vant"

// 阻止显示生产模式的消息
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
