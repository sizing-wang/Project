export const SERVER = "http://127.0.0.1:3000";
export const UPLOADPATH = SERVER + "/products/images";
export const UPLOADDETAILPATH = SERVER + "/products/detailImages";

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
    getUpdataProducts: ["/products", "put"]
};
