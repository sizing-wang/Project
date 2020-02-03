require("./index.css");
require("../common/footer/index");
require("../common/logo/index");

var _util = require("util");
var api = require("api");
var fromErr = {
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
        // console.log("::::::::::", window.location.href);
    },
    bindEvent: function (ev) {
        var $this = this;
        $(".btn-submit").on("click", function () {
            $this.submit()
        });

        $("[name='password']").on("keyup", function (ev) {
            if (ev.keyCode == 13) {
                $this.submit()
            }
        })
    },
    submit: function () {
        // 获取数据
        var fromDate = {
            username : $.trim($("[name='username']").val()),
            password : $.trim($("[name='password']").val())
        };
        // 验证数据合法性
        var fromDataValiDate = this.valiDate(fromDate);
        // 数据合法, 提交数据
        if (fromDataValiDate.status) {
            // 数据验证通过, 错误信息提示置空
            fromErr.hide();
            // 发送ajax
            api.login({
                data: fromDate,
                success: function () {
                    // console.log(_util.getParamsFromUrl("redirect"))
                    window.location.href = _util.getParamsFromUrl("redirect") || "/"
                },
                error: function (errMsg) {
                    fromErr.show(errMsg)
                }
            })
        } else {
            // 数据验证不通过, 错误信息提示
            fromErr.show(fromDataValiDate.msg)
        }

    },
    valiDate: function (fromDate) {
        var result = {
            status : false,
            msg: ""
        }
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
