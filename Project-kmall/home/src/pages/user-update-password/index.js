require("./index.css");
require("../common/footer/index");
require("../common/search/index");
let _side = require("../common/side/index");
let api = require("api")
let _util = require("util")

let fromErr = {
    showErr: function (msg) {
        $(".error-item")
        .show()
        .find(".error-msg")
        .text(msg)
    },
    showHide: function () {
        $(".error-item")
        .hide()
        .find(".error-msg")
        .text("")
    }
}


const page = {
    init: function () {
        _side.render("user-update-password")
        this.bindEvent()
    },
    bindEvent: function () {
        let _this = this
        $(".btn-submit").on("click", function () {
            _this.upDatePassword()
        })
        $("[name='repassword']").on("keyup", function (ev) {
            if (ev.keyCode == 13) {
                _this.upDatePassword()
            }
        })
    },
    upDatePassword: function () {
        // 获取数据
        let fromData = {
            password: $.trim($("[name='password']").val()),
            repassword: $.trim($("[name='repassword']").val())
        }
        // 验证数据合法性
        if (this.valiDate(fromData).status) {
            // 将错误提示信息置空
            fromErr.showHide()
     
            if (fromData.password != fromData.repassword) {
                fromErr.show("两次密码输入不一致")
            }
            // 发送ajax请求
            api.upDataPassword({
                data: fromData,
                success: function (data) {
                    // console.log("::::::::", data);
                    if (data.code == 0) {
                        // 清除用户影响, 重新登录
                        api.logout({
                            success: function () {
                                _util.goLogIn()
                            },
                            error: function (msg) {
                                _util.showErrorMsg(msg)
                            }
                        })
                    }
                },
                error: function (msg) {
                    fromErr.showErr(msg)
                }
            })

        } else {
            fromErr.showErr(this.valiDate(fromData).msg)
        }
    },
    valiDate: function (fromData) {
        let result = {
            status: false,
            msg: ""
        }
        if (!_util.valiDate(fromData.password, "require")) {
            result.msg = "密码不能为空"
            return result
        }
        if (!_util.valiDate(fromData.password, "password")) {
            result.msg = "请输入任意字符的3-6位字符"
            return result
        }
        if (!_util.valiDate(fromData.repassword, "require")) {
            result.msg = "重复密码不能为空"
            return result
        }
        if (fromData.password != fromData.repassword) {
            result.msg = "两次密码输入不一致"
            return result
        }

        result.status = true
        return result
    }

}



$(function () {
    page.init()
})
