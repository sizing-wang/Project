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
        })
    },
    submit: function () {
        // 获取数据
        let fromDate = {
            username : $.trim($("[name='username']").val()),
            password : $.trim($("[name='password']").val())
        };
        // 验证数据合法性
        let fromDataValiDate = this.valiDate(fromDate);
        // 数据合法, 提交数据
        if (fromDataValiDate.status) {
            // 数据验证通过, 错误信息提示置空
            fromErr.hide();
            // 发送ajax
            api.login({
                data: fromDate,
                success: function () {
                    window.location.href = "/"
                },
                error: function (errMsg) {
                    fromErr.show(errMsg)
                }
            })
            /*
            $.ajax({
                url: "/sessions/users",
                method: "post",
                dataType: "json",
                data: fromDate,
                success: function (result) {
                    if (result.code === 0) {
                        window.location.href = "/"
                    } else {
                        fromErr.show(result.message)
                    }
                },
                error: function (err) {
                    fromErr.show("请求失败, 请稍后再试!!!")
                }
            })
            */
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

        result.status = true;
        return result
    }

}


$(function () {
    page.init()
})
