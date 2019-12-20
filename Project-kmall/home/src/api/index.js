let { API_CONFIG } = require("./config");
let _util = require("util")

const getApiObj = (API_CONFIG) => {
    let apiObj = {};
    for (let key in API_CONFIG) {
        apiObj[key] = (option) => {
            let url = API_CONFIG[key][0] || "/";
            let method = API_CONFIG[key][1] || "get";
            // 发送ajax请求
            return request({
                url: url,
                method: method,
                data: option.data,
                success: option.success,
                error: option.error
            })
        }
    }
    return apiObj
};
const request = (option) => {
    $.ajax({
        url: option.url,
        method: option.method,
        dataType: "json",
        data: option.data,
        success: function (result) {
            if (result.code === 0) { // 请求成功
                option.success && option.success(result)
            } else if (result.code === 1) { // 请求失败
                option.error && option.error(result.message)
            } else if (result.code === 10) { // 没有用户权限
                _util.goLogIn()
            }
        },
        error: function (err) {
            option.error && option.error("网络错误, 请稍后再试!!!")
        }
    })
};

module.exports = getApiObj(API_CONFIG)