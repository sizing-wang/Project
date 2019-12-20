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
    goLogIn: function () {
        window.location.href = "/user-login.html"
    }
}