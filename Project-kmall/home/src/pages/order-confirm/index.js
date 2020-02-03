require("./index.css")
let _nav = require("../common/nav/index")
require("../common/search/index")
require("../common/footer/index")
let shippingTpl = require("./shipping.tpl")
let productsTpl = require('./product.tpl')

let _util = require("util")
let api = require("api/")
let _modal = require("./modal")

let page = {
    init: function () {
        this.$shippingBox = $(".shipping-box")
        this.$productBox = $(".product-box")
        // 加载收货地址
        this.loadShipping()
        // 加载商品列表
        this.loadProductsList()
        // 监听事件
        this.bindEvent()
    },
    bindEvent: function () {
        let _this = this
        // 自定义事件, 获取新增地址后的最新数据, 更新地址列表
        this.$shippingBox.on('get-shippings', function (ev, shippings) {
            // 更新地址列表
            _this.renderShipping(shippings)

        })
        // 点击增加地址, 显示弹出层
        this.$shippingBox.on("click", ".shipping-add", function () {
            _modal.show()
        })
        // 处理点击删除按钮
        this.$shippingBox.on("click", ".shipping-delete", function (ev) {
            // 阻止事件冒泡, 防止误选地址的选中状态
            ev.stopPropagation()
            let $this = $(this)
            let shippingId = $this.parents(".shipping-item").data("shipping-id")
            if (_util.showConfirm("确定删除该地址吗?")) {
                // 发送请求, 根据地址id, 删除对应地址
                api.deleteShipping({
                    data: {
                        id: shippingId
                    },
                    success: function (result) {
                        // 删除地址后, 重新获取用户下剩余的所有收货地址数据
                        let shipping = result.data
                        // 更新地址列表
                        _this.renderShipping(shipping)
                    },
                    error: function () {
                        _util.showErrorMsg("删除失败, 请稍后再试!!!")
                    }
                })

            }
        })
        // 处理点击编辑按钮
        this.$shippingBox.on("click", ".shipping-edit", function (ev) {
            // 阻止事件冒泡, 防止误选地址的选中状态
            ev.stopPropagation()
            let $this = $(this)
            // 获取编辑地址对应id
            let shippingId = $this.parents(".shipping-item").data("shipping-id")
            // 发送请求, 获取地址详情数据
            api.getShippingDetail({
                data: {
                    id: shippingId
                },
                success: function (result) {
                    let shippingDetail = result.data
                    // 显示弹出层
                    _modal.show(shippingDetail)
                },
                error: function () {
                    _util.showErrorMsg("操作失败, 请示后再试!!!")
                }
            })

        })
        // 处理选中状态
        this.$shippingBox.on("click", ".shipping-item", function () {
            let $this = $(this)
            $this.addClass("active")
                .siblings(".shipping-item")
                .removeClass("active")

            // 将当前选中状态的地址id 存储到this全局中(方便判断)
            _this.selectShippingId = $this.data('shipping-id')
        })
        // 提交订单: 创建订单; 成功; 进入订单支付页面
        this.$productBox.on('click', ".btn-submit", function () {
            // 判断有没有选中收货地址, 如果选中提交订单, 否则,相反
            if (_this.selectShippingId) {
                // 发送请求, 创建订单
                api.createProductOrder({
                    data: {
                        shippingId: _this.selectShippingId
                    },
                    success: function (result) {
                        let order = result.data
                        // 去支付页面
                        window.location.href = "payment.html?orderNo=" + order.orderNo
                    },
                    error: function () {
                        _util.showErrorMsg("创建订单失败, 请稍后再试!!!")
                    }
                })
            } else { // 提示信息
                _util.showErrorMsg("请选择收货地址")
            }
        })

    },
    renderShipping: function (shipping) {
        let _this = this
        // 更新地址列表时, 保持某个地址被选中的状态
        shipping.forEach(function (ship) {
            if (ship._id === _this.selectShippingId) {
                ship.active = true
            }
        })
        let html = _util.render(shippingTpl, {shipping})
        this.$shippingBox.html(html)
    },
    loadShipping: function () {
        let _this = this
        // 发送请求, 更新数据
        api.getShippingList({
            success: function (result) {
                let shipping = result.data
                /*
                let html = _util.render(shippingTpl, {shipping})
                _this.$shippingBox.html(html)
                */
                // 更新地址列表
                _this.renderShipping(shipping)
            },
            error: function () {
                _util.showErrorMsg("获取地址列表失败, 请稍后再试!!!")
            }
        })

    },
    loadProductsList: function () {
        let _this = this
        // 发送请求, 加载数据
        api.getProductsOrder({
            success: function (result) {
                let data = result.data
                if (data.cartList.length > 0) {
                    let html = _util.render(productsTpl, data)
                    _this.$productBox.html(html)
                } else {
                    _this.$productBox.html("<p class='empty-message'>请选择要结算的商品 ... </p>")
                }
            },
            error: function (msg) {
                _this.$productBox.html("<p class='empty-message'>操作失败, 请稍后再试 ... </p>")
            }
        })

    }
}

$(function () {
    page.init()
})
