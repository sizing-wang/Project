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
        // 发送请求, 加载图形验证码
        this.handleGetCaptcha()
    },
    handleGetCaptcha: function () {
        let _this = this
        // 发送请求, 获取图形验证码
        api.getCaptcha({
            success: function (result) {
                const captcha = result.data
                if (result.code == 0) {
                    // 将获取到的验证码, 插入到dom节点中
                    $(".captcha-img svg").replaceWith(captcha)
                    // _this.captcha = captcha
                    
                } else {
                    fromErr.show("获取验证码失败, 请稍后再试!!!")
                }
            },
            error: function (err) {
                fromErr.show(err)
            }
        })
    },
    bindEvent: function (ev) {
        var $this = this;
        $(".btn-submit").on("click", function () {
            $this.submit()
        });

        $("[name='captcha']").on("keyup", function (ev) {
            if (ev.keyCode == 13) {
                $this.submit()
            }
        });

        $(".captcha-img").on("click", function () {
            api.getCaptcha({
                success: function (result) {
                    const captcha = result.data
                    if (result.code == 0) {
                        // 将获取到的验证码插入到dom节点中
                        $(".captcha-box svg").replaceWith(captcha)
                    } else {
                        fromErr.show("获取验证码失败, 请稍后再试!!!")
                    }
                },
                error: function (err) {
                    fromErr.show(err)
                }
            })
        })
    },
    submit: function () {
        // 获取数据
        var fromDate = {
            username : $.trim($("[name='phone']").val()),
            password : $.trim($("[name='password']").val()),
            captchaCode: $.trim($("[name='captcha']").val())
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
                success: function (result) {
                    // console.log(_util.getParamsFromUrl("redirect"))
                    if (result.code == 0) {
                        window.location.href = _util.getParamsFromUrl("redirect") || "/"
                    } else {
                        fromErr.show("登陆失败, 刷新再试 !")
                    }
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
        if (!_util.valiDate(fromDate.username, "phone")) {
            result.msg = "用户名或手机号格式不正确";
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
        // 校验验证码
        if (!_util.valiDate(fromDate.captchaCode, "require")) {
            result.msg = "验证码不能为空";
            return result
        }

        result.status = true;
        return result
    }

}


$(function () {
    page.init()
})
