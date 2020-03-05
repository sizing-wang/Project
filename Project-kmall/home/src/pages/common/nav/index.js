require("./idnex.css")
require("../../common/index")

let api = require("api")
let _util = require("util")
let cartProductTpl = require("./cart-productList.tpl")

let page = {
    init: function () { // 初始化
        this.loadUsername()
        this.bindEvent()
        this.loadCartsCount()
        return this
    },
    bindEvent: function() { // 监听事件
        $('#logout').on("click", function () {
            api.logout({
                success: function () {
                    _util.goLogIn()
                },
                error: function (msg) {
                    _util.showErrorMsg(msg)
                }
            })
        })
        // 鼠标在购物车移入移出事件
        $(".cart-small-panel").on("mouseenter", function () { // mouseleave
            // 显示购物车商品面板
            $(".cart-content").show()
            // 发送请求, 获取购物车商品信息
            setTimeout(() => { // 加延迟定时, 模拟请求延迟
                api.getCartsProducts({
                    success: function (result) {
                        // console.log("::::::::::", result);
                        let cartProductList = result.data
                        let html = _util.render(cartProductTpl, cartProductList)
                        $(".cart-content").html(html)                       
                    },
                    error: function () {
                        // 取消loading图标
                        $(".loader").hide()
                        // 显示提示信息
                        $(".empty-cart").show()
                    }
                }) 
            }, 1000);
            
        })
        $(".cart-small-panel").on("mouseleave", function () {
            $(".cart-content").hide()
        })

    },
    loadCartsCount: function () { // 加载购物车商品数量
        api.getCartsCount({
            success: function (count) {
                $(".cart-num").text(count.data || 0)
            },
            error: function () {
                $(".cart-num").text(0)
            }
        })
    },
    loadUsername: function () { // 加载用户名
        api.getUsername({
            success: function (result) {
                // console.log(":::::::::", result);
                let username = result.data.username
                $(".not-login").hide()
                $('.login')
                    .show()
                    .find(".username")
                    .text(username)

            }
        })
    }
}

module.exports = page.init()

