let Hogan = require("hogan.js")
module.exports = {
    valiDate: function (value, type) {
        if (type === "require") {
            return !!value
        }
        if (type === "username") {
            // 以字母开头的3-6位字符
            return /^[a-z][a-z0-9]{2,5}$/ig.test(value)
        }
        if (type === "password") {
            // 以任意字母的3-6位字符
            return /^\w{3,6}$/ig.test(value)
        }
        if (type === "phone") {
            return /^[1][3|5|6|7|8]\d{9}$/ig.test(value)
        }
        if (type === "email") {
            return /^\w+@\w+\.\w{2,6}$/ig.test(value)
        }
    },
    showSuccessMsg: function (msg) {
        alert(msg)
    },
    showErrorMsg: function (msg) {
        alert(msg)
    },
    goLogIn: function () {                                    // 网址编码 // 记住当前网址, 登录成功后,继续跳转到当前网址
        window.location.href = "/user-login.html?redirect=" + encodeURIComponent(window.location.href)
    },
    goResult: function (type) {
        window.location.href = "/result.html?type=" + type
    },
    showConfirm: function (msg) {
        return window.confirm(msg)
    },
    getParamsFromUrl: function (key) {
        // type=register
        // type=register&name=tom
        // name=tom&type=register
        // name=tom&type=register&age=18
        let query = window.location.search.substr(1);
        let reg = new RegExp(`(^|&)${key}=([^&]*)`);
        let result = query.match(reg);
                        // 网址解码 
        return result ? decodeURIComponent(result[2]) : null
    },                  
    render: function (tpl, data) {
        let template = Hogan.compile(tpl);
        let html = template.render(data);
        return html
    }
}