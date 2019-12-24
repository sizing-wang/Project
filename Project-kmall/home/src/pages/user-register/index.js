require("./index.css");
require("../common/footer/index");
require("../common/logo/index");

let _util = require("util");
let api = require("api");
let fromErr = {
    show: function (msg) {
        $(".error-item")
            .show()
            .find(".error-msg")
            .text(msg)
    },
    hide: function () {
        $(".error-item")
            .hide()
            .find(".error-msg")
            .text("")
    }
}

const page = {
    init: function () {
        this.bindEvent()
    },
    bindEvent: function (ev) {
        let $this = this;
        $(".btn-submit").on("click", function () {
            $this.submit()
        });
        $("input").on("keyup", function (ev) {
            if (ev.keyCode === 13) {
                $this.submit()
            }
        });
        // 监听用户名输入框失去焦点事件, 判断是否已有用户名存在
        $("[name='username']").on("blur", function () {
            let username = $(this).val().trim();
            if (!_util.valiDate(username, "require")) {
                return
            }
            if (!_util.valiDate(username, "username")) {
                return
            }
            api.checkUsername({
                data: {
                    username
                },
                success: function (result) {
                    // console.log(result);
                    fromErr.hide()
                },
                error: function (err) {
                    fromErr.show(err)
                }
            })
        })
    },
    submit: function () {
        // 获取数据
        let fromDate = {
            username : $.trim($("[name='username']").val()),
            password : $.trim($("[name='password']").val()),
            repassword : $.trim($("[name='repassword']").val()),
            phone : $.trim($("[name='phone']").val()),
            email : $.trim($("[name='email']").val()),
        };
        // 验证数据合法性
        let fromDataValiDate = this.valiDate(fromDate);
        // 数据合法, 提交数据
        if (fromDataValiDate.status) {
            // 数据验证通过, 错误信息提示置空
            fromErr.hide();
            // 发送ajax
            api.register({
                data: fromDate,
                success: function (result) {
                    // console.log(result);
                    window.location.href = "/result.html?type=register"
                },
                error: function (msg) {
                    fromErr.show(msg)
                }
            })
        } else {
            // 数据验证不通过, 错误信息提示
            fromErr.show(fromDataValiDate.msg)
        }

    },
    valiDate: function (fromDate) {
        let result = {
            status : false,
            msg: ""
        };
        // 验证数据
        if (!_util.valiDate(fromDate.username, "require")) {
            result.msg = "用户名不能为空";
            return result
        }
        if (!_util.valiDate(fromDate.username, "username")) {
            result.msg = "用户名请以字母开头的3-6位字符";
            return result
        }
        if (!_util.valiDate(fromDate.password, "require")) {
            result.msg = "用户密码不能为空";
            return result
        }
        if (!_util.valiDate(fromDate.password, "password")) {
            result.msg = "密码请以3-6位的任意字符";
            return result
        }
        if (!_util.valiDate(fromDate.repassword, "require")) {
            result.msg = "再次输入用户密码不能为空";
            return result
        }
        if (fromDate.password !== fromDate.repassword) {
            result.msg = "两次密码输入不一致";
            return result
        }
        if (!_util.valiDate(fromDate.phone, "require")) {
            result.msg = "手机号码不能为空";
            return result
        }
        if (!_util.valiDate(fromDate.phone, "phone")) {
            result.msg = "手机号码格式不正确";
            return result
        }
        if (!_util.valiDate(fromDate.email, "require")) {
            result.msg = "电子邮箱不能为空";
            return result
        }
        if (!_util.valiDate(fromDate.email, "email")) {
            result.msg = "电子邮箱格式不正确";
            return result
        }


        result.status = true;
        return result
    }

}


$(function () {
    page.init()
})
