import Vue from "vue"
import Vuex from 'vuex'

import home from "../views/home/store"
import detail from "../views/detail/store"
import register from "../views/register/store"
import login from "../views/login/store"
import carts from "../views/cart/store"
import profile from "../views/profile/store"
import orderConfirm from "../views/order-confirm/store"
import orderList from "../views/order-list/store"
import orderDetail from "../views/order-detail/store"

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    home: home,
    detail: detail,
    register: register,
    login: login,
    carts: carts,
    profile: profile,
    orderConfirm: orderConfirm,
    orderList: orderList,
    orderDetail: orderDetail
  }
})
