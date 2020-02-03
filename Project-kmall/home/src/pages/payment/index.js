require("./index.css")
let _nav = require("../common/nav/index")
require("../common/search/index")
require("../common/footer/index")

let _util = require("util")
let api = require("api/")
let tpl = require('./payment.tpl')

let page = {
    paymentParams: {
        orderNo: _util.getParamsFromUrl("orderNo")
    },
    init: function () {
        this.timer = 0
        this.$paymentBox = $(".payment-box")
        // 加载支付页面信息
        this.loadPaymentInfo()
    },
    loadPaymentInfo: function () {
        let _this = this
        // 根据订单号, 发送请求, 加载该订单号的支付信息页面
        if (this.paymentParams.orderNo) { // 发送请求
            api.getPaymentInfo({
                data: {
                    orderNo: this.paymentParams.orderNo
                },
                success: function (result) {
                    let payment = result.data
                    let html = _util.render(tpl, payment)
                    _this.$paymentBox.html(html)

                    // 在当前的支付页面中, 实时监听支付状态
                    _this.listenPaymentStatus()
                },
                error: function () {
                    _this.$paymentBox.html("<p class='empty-message'>支付页面加载失败, 请稍后再试!!!</p>")
                }
            })
        } else { // 没有该订单号, 提示信息
            this.$paymentBox.html("<p class='empty-message'>没有订单号, 请选择需要结算的商品</p>")
        }
    },
    listenPaymentStatus: function () {
        let _this = this
        // 发送请求, 实时监听用户的支付状态
        this.timer = setInterval(function () {
            api.listenPaymentStatus({
                data: {
                    orderNo: _this.paymentParams.orderNo
                },
                success: function (result) {
                    let paymentStatus = result.data
                    // console.log(paymentStatus);
                    if (paymentStatus) {
                        // 支付成功, 提示一下
                        window.location.href = "/result.html?type=payment&orderNo=" + _this.paymentParams.orderNo
                    }
                },
                error: function () {
                    _util.showErrorMsg("网络错误, 请稍后再试!!!")
                }
            })
        }, 1000)
    }
}

$(function () {
    page.init()
})
