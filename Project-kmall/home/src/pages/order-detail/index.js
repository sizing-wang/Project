require("./index.css")
require("../common/nav/index")
require("../common/search/index")
require("../common/footer/index")

let _util = require("util")
let api = require("api/")
let tpl = require("./index.tpl")
let _side = require("../common/side/index")


let page = {
    getOrderDetailParams: { // 获取地址栏中的参数信息
        orderNo: _util.getParamsFromUrl("orderNo") || ""
    },
    init: function () {
        this.$orderDetailBox = $(".order-box")
        // 加载侧边栏
        this.loadSideList()
        // 加载订单详情
        this.loadOrderDetail()
        // 监听事件
        this.bindEvent()
    },
    loadSideList: function () {
        _side.render("order-list")
    },
    loadOrderDetail: function () {
        let _this = this
        // 发送请求, 获取订单详情数据, 更新页面
        api.getOrderDetail({
            data: _this.getOrderDetailParams,
            success: function (result) {
                let orderDetail = result.data
                // 处理创建订单的时间格式
                orderDetail.createdAt = new Date(orderDetail.createdAt).toLocaleString()
                orderDetail.canPay = orderDetail.cancel = orderDetail.status == 10 ? true : false
                if (_this.getOrderDetailParams.orderNo) {
                    // 渲染模板, 更新数据
                    let html = _util.render(tpl, orderDetail)
                    _this.$orderDetailBox.html(html)
                } else {
                    _this.$orderDetailBox.html("<p class='empty-message'>还没有订单哦 ... </p>")
                }
            },
            error: function () {
                _this.$orderDetailBox.html("<p class='empty-message'>网络错误, 请稍后再试!!!</p>")
            }
        })
    },
    bindEvent: function () {
        let _this = this
        // 处理点击取消按钮事件
        this.$orderDetailBox.on("click", ".btn-cancel", function () {
            // 发送请求, 更新数据
            if (_util.showConfirm("确定取消该订单吗?")) {
                api.getOrderCancel({
                    data: {
                        orderNo: _this.getOrderDetailParams.orderNo,
                        status: "20"
                    },
                    success: function (result) {
                        let orderStatus = result.data;
                        // 更新页面中数据
                        let html = _util.render(tpl, orderStatus)
                        _this.$orderDetailBox.html(html)
                    },
                    error: function (msg) {
                        _util.showErrorMsg(msg)
                    }
                })
            }
        })
    }
}

$(function () {
    page.init()
})
