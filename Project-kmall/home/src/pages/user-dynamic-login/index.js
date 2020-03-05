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
        let $this = this
        // 监听点击获取手机验证码按钮事件
        $(".btn-verify-code").on("click", function () {
            $this.showCaptchaBox()
        })
        // 监听图形验证码输入框聚焦事件
        $(".verify-ipt").on("focus", function () {
            $(".captcha-box").hide()
        })
        // 监听图形验证码盒子点击事件
        $(".captcha").on("click", function () {
            $this.getCaptcha()
        })
        // 监听点击发送验证码按钮事件
        $(".btn-captcha").on("click", function () {
             // 获取数据
            let fromDate = {
                phone: $("[name='phone']").val().trim(),
                captchaCode: $("[name='captcha']").val().trim()
            }
            $this.getVerifyCode(fromDate)
        })
        // 监听手机验证码发送成功提示面板关闭按钮事件
        $(".btn-close").on("click", function () {
            $(".msg-wrap").hide()
        })
        // 监听点击提交按钮事件
        $(".btn-submit").on("click", function () {
            $this.submit()
        })
        // 监听回车键提交事件
        $(".captcha-ipt").on("keyup", function (ev) {
            if (ev.keyCode == 13) {
                $this.submit()
            }
        })
    },
    showCaptchaBox: function () {
        $(".captcha-box").show()
        // 发送请求, 获取图形验证码
        api.getCaptcha({
            success: function (result) {
               const captcha = result.data
               if (result.code == 0) {
                    // 将获取到的图形验证码数据, 替换到指定的dom节点中
                    $(".captcha svg").replaceWith(captcha)
               } else {
                   fromErr.show("获取验证码失败, 刷新再试 !")
               }
            },
            error: function (err) {
                fromErr.show(err)
            }
        })
    },
    getCaptcha: function () {
        api.getCaptcha({
            success: function (result) {
               const captcha = result.data
               if (result.code == 0) {
                    // 将获取到的图形验证码数据, 替换到指定的dom节点中
                    $(".captcha svg").replaceWith(captcha)
               } else {
                   fromErr.show("获取验证码失败, 刷新再试 !")
               }
            },
            error: function (err) {
                fromErr.show(err)
            }
        })
    },
    getVerifyCode: function (fromDate) {
        if (!_util.valiDate(fromDate.phone, "require")) {
            fromErr.show("手机号码不能为空 !")
            return
        }
        if (!_util.valiDate(fromDate.phone, "phone")) {
            fromErr.show("手机号码格式不正确 !")
            return
        }
            // 发送请求, 获取手机短信验证码
            api.getVerifyCodeLogin({
                data: fromDate,
                success: function (result) {
                    // 显示验证码发送成功提示面板
                    $(".msg-wrap").show()
                    $(".msg-box .verifyCode-msg").text(result.message)
                },
                error: function (err) {
                    fromErr.show(err)
                }
            })
        
    },
    submit: function () {
        // 获取数据
       let fromDate = {
        phone: $("[name='phone']").val().trim(),
        captchaCode: $("[name='captcha']").val().trim(),
        verifyCode: $("[name='verify']").val().trim()
       }
        // 验证数据合法性
        let fromDateValiDate = this.valiDate(fromDate)
        if (fromDateValiDate.status) {
            // 将提示信息置空
            fromErr.hide()
            // 数据合法, 提交数据
            api.verifyCodeLogin({
                data: fromDate,
                success: function (result) {
                    if (result.code == 0) {
                        window.location.href = _util.getParamsFromUrl("redirect") || "/"
                    } else {
                        fromErr.show("登陆失败, 刷新再试 !")
                    }
                },
                error:function (err) {
                    fromErr.show(err)
                }
            })
        } else {
            fromErr.show(fromDateValiDate.msg)
        }

    },
    valiDate: function (fromDate) {
        var result = {
            status : false,
            msg: ""
        }
        // 验证数据
        if (!_util.valiDate(fromDate.phone, "require")) {
            result.msg = "手机号不能为空";
            return result
        }
        if (!_util.valiDate(fromDate.phone, "phone")) {
            result.msg = "手机号格式不正确";
            return result
        }
        // 校验验证码
        if (!_util.valiDate(fromDate.verifyCode, "require")) {
            result.msg = "手机验证码不能为空";
            return result
        } 

        result.status = true;
        return result
    }

}


$(function () {
    page.init()
})
