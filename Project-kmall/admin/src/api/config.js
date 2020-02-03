export const SERVER = "http://127.0.0.1:3000";
export const UPLOADPATH = SERVER + "/products/images";
export const UPLOADDETAILPATH = SERVER + "/products/detailImages";
export const UPLOADADIMAGE = SERVER + "/ads/image";

export const API_CONFIG = {
    login: ["/sessions/users", "post"],
    logout: ["/sessions/users", "delete"],
    getCounts: ["/counts", "get"],
    getUserList: ["/users/list", "get"],
    addCategory: ["/categories", "post"],
    setLevelCategory: ["/categories/levelCategories", "get"],
    getCategoriesList: ["/categories/list", "get"],
    getUpdateNameCategory: ["/categories/name", "put"],
    getUpdateMobileNameCategory: ["/categories/mobileName", "put"],
    getUpdateOrderCategory: ["/categories/order", "put"],
    getUpdateIsShowCategory: ["/categories/isShow", "put"],
    getUpLoadProducts: ["/products", "post"],
    getProductsList: ["/products/list", "get"],
    getProductsIsShow: ["/products/isShow", "put"],
    getProductsIsStates: ["/products/status", "put"],
    getProductsIsHot: ["/products/isHot", "put"],
    getProductsIsOrder: ["/products/order", "put"],
    getProductsDetail: ["/products/detail", "get"],
    getUpdataProducts: ["/products", "put"],
    getSaveAd: ["/ads", "post"],
    getAdList: ["/ads/list", "get"],
    getAdIsShow: ["/ads/isShow", "put"],
    getAdOrder: ["/ads/order", "put"],
    getAdDetail: ["/ads/detail", "get"],
    getAdUpData: ["/ads", "put"],
    getOrderList: ["/orders/list", "get"],
    getOrderDetail: ["/orders/detail", "get"]
};
