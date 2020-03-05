import { SERVER, API_CONFIG } from "./config"
import axios from "axios"
import { removeUsername } from "util"

const getApiObj = (API_CONFIG) => {
    let apiObj = {};
    for (let key in API_CONFIG) {
        apiObj[key] = (data) => {
            let url = SERVER + API_CONFIG[key][0];
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
            withCredentials: true
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
                    // 后台sessions信息已经过期, 需要删除前台保存的用户信息
                    removeUsername();
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

export default getApiObj(API_CONFIG);
