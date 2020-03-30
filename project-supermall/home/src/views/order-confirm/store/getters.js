// store 的计算属性
export default {
  addressList (state) {
      if (state.addressList.length > 0) {
         return state.addressList
      }
  },
  orderProducts(state) {
    if (state.orderProducts) {
      return state.orderProducts
    }
  },
  addressDetail(state) {
    if (state.addressDetail) {
      return state.addressDetail
    }
  }
}
