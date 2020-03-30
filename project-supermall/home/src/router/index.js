import Vue from "vue"
import VueRouter from "vue-router"

// 组件的懒加载
const Home = () => import("../views/home/Home");
const Category = () => import("../views/category/Category");
const Cart = () => import("../views/cart/Cart");
const Profile = () => import("../views/profile/Profile");
const Detail = () => import("../views/detail/Detail");
const Login = () => import("../views/login/LogIn");
const Register = () => import("../views/register/Register");
const Orderconfirm = () => import("../views/order-confirm/Orderconfirm");
const OrderList = () => import("../views/order-list/OrderList");
const OrderDetail = () => import("../views/order-detail/OrderDetail");


// 安装路由
Vue.use(VueRouter);

// 创建路由
const routes = [
  {path: "/", redirect: "/home"},
  {path: "/home", component: Home},
  {path: "/category", component: Category},
  {
    path: "/cart",
    component: Cart,
    meta: { requiresAuth: true } // 添加表示需要验证
  },
  {
    path: "/profile",
    component: Profile,
    meta: { requiresAuth: true } // 添加表示需要验证
  },
  {path: "/detail/:id", component: Detail},
  {path: "/login", component: Login},
  {path: "/register", component: Register},
  {path: "/orderConfirm", component: Orderconfirm},
  {path: "/orderList", component: OrderList},
  {path: "/orderDetail/:orderNo", component: OrderDetail}
]

const router = new VueRouter({
  routes,
  mode: "history"
})

// 导出路由
export default router
