
let API_CONFIG = {
    login: ["/sessions/users", "post"],
    getUsername: ["/sessions/username", "get"],
    logout: ["/sessions/users", "delete"],
    register: ["/users", "post"],
    checkUsername: ["/users/checkUsername", "get"],
    getUserInfo: ["/sessions/users", "get"],
    upDataPassword: ["/users", "put"],
    getHomeCategories: ["/categories/homeCategories", "get"]
};

module.exports = {
    API_CONFIG
}
