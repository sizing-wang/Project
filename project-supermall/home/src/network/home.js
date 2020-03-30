import {request} from "./request"

// 获取搜索数据
export function getSearchData(keyword) {
  return request({
    url: "/products/search",
    params: {
      keyword
    }
  })
}
// 获取首页轮播图数据
export function getHomeCarouselData() {
  return request({
    url: "/ads/positionAds"
  })
}
// 获取首页分类导航数据
export function getHomeCategoryData() {
  return request({
    url: "/categories/treeCategories"
  })
}
// 获取首页今日推荐数据
export function getHomeHotData() {
  return request({
    url: "/products/hot"
  })
}
// 获取商品楼层数据
export function getFloorsData() {
  return request({
    url: "/floors/"
  })
}
// 获取当前商品详情信息数据
export function getProductDetail(id) {
  return request({
    url: "/products/detail",
    params: {id}
  })
}

// 获取图形验证码
export function getCaptcha() {
  return request({
    url: "/users/captcha"
  })
}

// 获取注册短信验证码
export function getVerifyCode(payload) {
  return request({
    url: "/users/registerVerifyCode",
    params: {
      phone: payload.phone,
      captchaCode: payload.captchaCode
    }
  })
}

// 用户注册
export function userRegister(payload) {
  return request({
    url: "/users/",
    data: {
      phone: payload.phone,
      password: payload.password,
      verifyCode: payload.verifyCode
    }
  })
}

// 用户登录
export function userLogin(payload) {
  return request({
    url: "/users/login",
    data: {
      username: payload.username,
      password: payload.password,
      captchaCode: payload.captchaCode
    }
  })
}

// 用户退出
export function getLogout() {
  return request({
    url: "/users/logout"
  })
}

// 添加购物车
export function addCarts(payload) {
  return request({
    url: "/carts/",
    data: {
      productId: payload.productId,
      count: payload.count,
      attr: payload.attr
    }
  })
}

// 获取购物车中商品信息
export function getCarts() {
  return request({
    url: "/carts/get"
  })
}

// 获取选中不选中状态数据
export function getChoices(payload) {
  return request({
    url: "/carts/choices",
    data: {
      productId: payload.productId,
      checked: payload.check
    }
  })
}

// 获取删除选中购物车商品
export function getDeleteProduct(payload) {
  return request({
    url: "/carts/delete",
    data: {
      productId: payload.productId
    }
  })
}

// 添加收货地址
export function getSaveAddress(payload) {
  return request({
    url: "/shippings/",
    data: {
      name: payload.val.name,
      phone: payload.val.tel,
      province: payload.val.province,
      city: payload.val.city,
      county: payload.val.county,
      address: payload.val.addressDetail,
      areaCode: payload.val.areaCode
    }
  })
}

// 编辑收货地址
export function getEditAddress(payload) {
  return request({
    url: "/shippings/edit",
    data: {
      id: payload.addressId,
      name: payload.val.name,
      phone: payload.val.tel,
      province: payload.val.province,
      city: payload.val.city,
      county: payload.val.county,
      address: payload.val.addressDetail,
      areaCode: payload.val.areaCode
    }
  })
}

// 获取收货地址列表
export function getAddressList() {
  return request({
    url: "/shippings/list"
  })
}

// 处理删除选中的收货地址
export function handleDelAddress(payload) {
  return request({
    url: "/shippings/delete",
    data: {
      id: payload.addressId
    }
  })
}

// 获取生成订单的商品列表
export function getOrderProducts() {
  return request({
    url: "/orders/products"
  })
}

// 获取当前登录用户的用户名
export function getUsername(payload) {
  return request({
    url: "/users/username"
  })
}

// 获取当前收获地址的详情信息
export function getAddressDetail(payload) {
  return request({
    url: "/shippings/detail",
    params: {
      id: payload.addressId
    }
  })
}

// 创建订单
export function getOrderConfirm(payload) {
  return request({
    url: "/orders/",
    data: {
      paymentType: payload.paymentType,
      shippingId: payload.shippingId,
      channel: 'mobile'
    }
  })
}

// 获取当前登录用户的订单列表数据
export function getOrderList() {
  return request({
    url: "/orders/list"
  })
}

// 获取当前订单的详情数据
export function getOrderDetail(payload) {
  return request({
    url: "/orders/detail",
    params: {
      orderNo: payload.orderNo
    }
  })
}
