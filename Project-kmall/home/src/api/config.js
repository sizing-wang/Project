
let API_CONFIG = {
    login: ["/sessions/users", "post"],
    getUsername: ["/sessions/username", "get"],
    logout: ["/sessions/users", "delete"],
    register: ["/users", "post"],
    checkUsername: ["/users/checkUsername", "get"],
    getUserInfo: ["/sessions/users", "get"],
    upDataPassword: ["/users", "put"],
    getHomeCategories: ["/categories/homeCategories", "get"],
    getHomeAdImages: ["/ads/positionAds", "get"],
    getFloorData: ["/floors", "get"],
    getListData: ["/products/list", "get"],
    getProductsDetail: ["/products/detail", "get"],
    addCarts: ["/carts", "post"],
    getCartsCount: ["/carts/count", "get"],
    getCartsProducts: ["/carts", "get"],
    getCartsChoices: ["/carts/choices", "put"],
    deleteCartProduct: ["/carts", "delete"],
    upDataProductCount: ["/carts/counts", "put"],
    getProductsOrder: ["/orders/products", "get"],
    addShipping: ["/shippings", "post"],
    getShippingList: ["/shippings/list", "get"],
    deleteShipping: ["/shippings", "delete"],
    getShippingDetail: ["/shippings/detail", "get"],
    upDataShippingDetail: ["/shippings", "put"],
    createProductOrder: ["/orders", "post"],
    getPaymentInfo: ["/payments", "get"],
    listenPaymentStatus: ["/payments/status", "get"],
    getOrderList: ["/orders/list", "get"],
    getOrderDetail: ["/orders/detail", "get"],
    getOrderCancel: ["/orders/status", "put"]
};

module.exports = {
    API_CONFIG
}
