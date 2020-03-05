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
        // 监听获取手机验证码事件
        $(".btn-verify-code").on("click", function () {
            $this.showCaptchaBox()
        })
        // 监听手机验证码输入框聚焦事件
        $(".verify-ipt").on("focus", function () {
            $this.hideCaptchaBox()
        })
        // 监听获取图形验证码点击事件
        $(".captcha-box .captcha").on("click", function () {
            // 发送请求, 获取图形验证码
            api.getCaptcha({
                success: function (result) {
                    const captcha = result.data
                    if (result.code == 0) {
                        // 将获取到的图形验证码数据, 替换到指定的dom节点中
                        $(".captcha svg").replaceWith(captcha)
                    } else {
                        fromErr.show("获取图形验证码失败, 请刷新再试 !")
                    }
                },
                error: function (err) {
                    fromErr.show(err)
                }
            })
        })
        // 监听获取手机短信验证码事件
        $(".btn-captcha").on("click", function () {
            // 获取手机号码和图形验证码
            const phone = $("[name='phone']").val().trim()
            const captchaCode = $("[name='captcha']").val().trim()
            if (!_util.valiDate(phone, "require")) {
                fromErr.show("手机号码不能为空 !")
                return
            }
            if (!_util.valiDate(phone, "phone")) {
                fromErr.show("手机号码格式不正确 !")
                return
            }
            api.getVerifyCode({
                data: {
                    phone,
                    captchaCode
                },
                success: function (result) {
                    // 将提示信息置空
                    fromErr.hide()
                    // 显示手机短信验证码发送成功面板
                    $(".msg-wrap").show()
                    $(".msg-container .msg-box .verifyCode-msg").text(result.message)
                },
                error: function (err) {
                    fromErr.show(err)
                }
            })
            
        })
        // 监听关闭手机短信验证码提示面板事件
        $(".msg-container .btn-close").on("click", function () {
            $(".msg-wrap").hide()
        })
        // 监听点击提交注册按钮事件
        $(".btn-submit").on("click", function () {
            $this.submit()
        });
        // 监听回车键提交用户注册表单事件
        $("input").on("keyup", function (ev) {
            if (ev.keyCode === 13) {
                $this.submit()
            }
        });
        // 监听用户名输入框失去焦点事件, 判断是否已有用户名存在
        $("[name='phone']").on("blur", function () {
            let username = $(this).val().trim();
            if (!_util.valiDate(username, "require")) {
                fromErr.show("用户名不能为空")
                return
            }
            if (!_util.valiDate(username, "phone")) {
                fromErr.show("用户名格式不正确")
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
    showCaptchaBox: function () {
        // 显示图形验证码面板
        $(".captcha-box").show() 
        // 发送请求, 获取图形验证码
        api.getCaptcha({
            success: function (result) {
                // console.log("::::::::::::", result);
                const captcha = result.data
                if (result.code == 0) {
                    // 将获取到的图形验证码数据, 替换到指定的dom节点中
                    $(".captcha-box .captcha svg").replaceWith(captcha)
                } else {
                    fromErr.show("图形验证码加载失败, 刷新再试!")
                }
                
            },
            error: function (err) {
                fromErr.show(err)
            }
        })
    },
    hideCaptchaBox: function () {
        $(".captcha-box").hide() // 隐藏图形验证码面板
    },
    submit: function () {
        // 获取数据
        let fromDate = {
            phone : $.trim($("[name='phone']").val()),
            verifyCode: $.trim($("[name='verify']").val()),
            password : $.trim($("[name='password']").val()),
            repassword : $.trim($("[name='repassword']").val()),
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
        if (!_util.valiDate(fromDate.phone, "require")) {
            result.msg = "手机号码不能为空";
            return result
        }
        if (!_util.valiDate(fromDate.phone, "phone")) {
            result.msg = "手机号码格式不正确";
            return result
        }
        if (!_util.valiDate(fromDate.verifyCode, "require")) {
            result.msg = "手机验证码不能为空";
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
        result.status = true;
        return result
    }
}


$(function () {
    page.init()
})
