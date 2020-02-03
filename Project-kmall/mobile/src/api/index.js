import { API_CONFIG } from "./config"
import axios from "axios"


const getApiObj = (API_CONFIG) => {
    let apiObj = {};
    for (let key in API_CONFIG) {
        apiObj[key] = (data) => {
            let url = API_CONFIG[key][0];
            let method = API_CONFIG[key][1];
            // 发送ajax请求
            return request(url, method, data)
        }
    }
    return apiObj
};
const request = (url, method, data) => {
    return new Promise((resolve, reject) => {
        // 发送ajax请求
        let option = {
            url: url,
            method: method,
            withCredentials: true // 允许携带 cookie 信息
        };
        switch (method.toUpperCase()) {
            case "GET" :
            case "DELETE" :
                option.params = data;
                break;
            default:
                option.data = data
        }
        axios(option)
            .then(result => {
                if (result.data.code === 10) {
                    // 返回登录页面
                    window.location.href = "/login"
                }
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
};

export default getApiObj(API_CONFIG)
// module.exports = getApiObj(API_CONFIG)

