require("./index.css");
require("../common/footer/index");
require("../common/search/index");
let _side = require("../common/side/index");
let api = require("api")
let _util = require("util")
let tpl = require("./index.tpl")

const page = {
    init: function () {
        this.renderSide()
        this.loadUserInfo()
    },
    renderSide: function () {
        _side.render("user-center")
    },
    loadUserInfo: function () {
        // 发送请求, 获取数据
        api.getUserInfo({
            success: function (data) {
                let html =_util.render(tpl,data.data)
                $(".side-content").html(html)
            }
        })
    }
}


$(function () {
    page.init()
})
