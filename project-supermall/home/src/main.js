import Vue from 'vue'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false;

// 管理全局store中的数据
import store from "./store"

// 注册全局过滤器
import filters from "common/filters"
// Object.keys: 将对象中的元素,一个个的取出,放进一个数组中
Object.keys(filters).forEach((filter, index) => {
  Vue.filter(filter, filters[filter])
});

// 判断路由是否需要用户登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //这里判断用户是否登录，验证本地存储是否有token
    if (!localStorage.token) { // 判断当前的token是否存在
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

// 引入组件库
import "./components/common/vant"

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
