require("./index.css")
let _nav = require("../common/nav/index")
require("../common/search/index")
require("../common/footer/index")

let api = require("api/")
let _util = require("util")
let cartsTpl = require("./index.tpl")


let page = {
    init: function () {
        this.$cartBox = $(".cart .cart-box")
        // 初始化购物车界面
        this.loadCartsProducts()
        // 监听事件
        this.bindEvent()
    },
    bindEvent: function () {
        let _this = this
        // 处理单个选中/取消状态
        this.$cartBox.on('click', ".select-one", function () {
            let $this = $(this)
            let productId = $this.parents(".product-item").data("product-id")
            if ($this.is(":checked")) {
                // 发送请求, 改变选中状态
                api.getCartsChoices({
                    data: {
                        productId: productId,
                        checked: true
                    },
                    success: function (result) {
                        // 更新数据
                        _this.renderCarts(result.data)
                    },
                    error: function () {
                        _this.$cartBox.html("<p class='empty-message'>操作失败, 请稍后再试 ... </p>")
                    }
                })
            } else { // 取消选中状态
                api.getCartsChoices({
                    data: {
                        productId: productId,
                        checked: false
                    },
                    success: function (result) {
                        // 更新数据
                        _this.renderCarts(result.data)
                    },
                    error: function () {
                        _this.$cartBox.html("<p class='empty-message'>操作失败, 请稍后再试 ... </p>")
                    }
                })
            }
        })
        // 处理全部选中/取消状态
        this.$cartBox.on("click", ".select-all", function () {
            let $this = $(this)
            if ($this.is(":checked")) { // 全选状态
                api.getCartsChoices({
                    data: {
                        checked: true
                    },
                    success: function (result) {
                        // 更新数据
                        _this.renderCarts(result.data)
                    },
                    error: function () {
                        _this.$cartBox.html("<p class='empty-message'>操作失败, 请稍后再试 ... </p>")
                    }
                })
            } else { // 取消状态
                api.getCartsChoices({
                    data: {
                        checked: false
                    },
                    success: function (result) {
                        // 更新数据
                        _this.renderCarts(result.data)
                    },
                    error: function () {
                        _this.$cartBox.html("<p class='empty-message'>操作失败, 请稍后再试 ... </p>")
                    }
                })
            }
        })
        // 处理单个删除: 需要获取到, 被删除商品的id
        this.$cartBox.on('click', ".delete-one", function () {
            let $this = $(this)
            let productId = $this.parents(".product-item").data("product-id")
            if (_util.showConfirm("你确定要删除改商品吗?")) {
                api.deleteCartProduct({
                    data: {
                        productId
                    },
                    success: function (result) {
                        _this.renderCarts(result.data)
                    },
                    error: function () {
                        _this.$cartBox.html("<p class='empty-message'>操作失败, 请稍后再试 ... </p>")
                    }
                })
            }
        })
        // 处理全部删除: (因为选中状态都存储在后台, 所以不需要id)
        this.$cartBox.on('click', ".delete-selected", function () {
            if (_util.showConfirm("你确定要删除改商品吗?")) {
                api.deleteCartProduct({
                    success: function (result) {
                        _this.renderCarts(result.data)
                    },
                    error: function () {
                        _this.$cartBox.html("<p class='empty-message'>操作失败, 请稍后再试 ... </p>")
                    }
                })
            }
        })
        // 处理商品数量的增加/减少
        this.$cartBox.on("click", ".count-btn", function () {
            let $this = $(this)
            // 获取商品id
            let productId = $this.parents(".product-item").data("product-id")
            // 获取输入框
            let $input = $this.siblings(".count-input")
            // 获取商品当前数量
            let currentVal = parseInt($input.val())
            // 存储商品数量的增加或减少(发送请求时的携带数据)
            let count = currentVal
            // 获取当前商品的库存
            let stock = $input.data("stock")
            // 增加
            if ($this.hasClass("plus")) {
                count = currentVal + 1
                if (count > stock) {
                    alert("商品数量不能超过库存")
                    return
                }
                // 发送请求, 更新数据
                api.upDataProductCount({
                    data: {
                        productId,
                        count
                    },
                    success: function (result) {
                        let data = result.data
                        _this.renderCarts(data)
                    },
                    error: function () {
                        _this.$cartBox.html("<p class='empty-message'>操作失败, 请稍后再试 ... </p>")
                    }
                })

            }
            // 减少
            else if ($this.hasClass("minus")) {
                count = currentVal - 1
                if (count < 1) {
                    alert("商品数量不能低于一件")
                    return
                }
                // 发送请求, 更新数据
                api.upDataProductCount({
                    data: {
                        productId,
                        count
                    },
                    success: function (result) {
                        let data = result.data
                        _this.renderCarts(data)
                    },
                    error: function () {
                        _this.$cartBox.html("<p class='empty-message'>操作失败, 请稍后再试 ... </p>")
                    }
                })
            }
        })
        // 处理点击去结算
        this.$cartBox.on("click", ".btn-submit", function () {
            if (_this.totalCartPrice > 0) {
                window.location.href = "order-confirm.html"
            } else {
                alert("请选择需要结算的商品 ... ")
            }
        })
    },
    renderCarts: function (data) {
        // 更新导航栏中购物车商品总数量(保持一致)
        _nav.loadCartsCount()
        if (data.cartList.length > 0) {
            // 将购物车内商品总金额存到this中, 方便判断
            this.totalCartPrice = data.totalCartPrice
            let html = _util.render(cartsTpl, data)
            this.$cartBox.html(html)
        } else {
            this.$cartBox.html("<p class='empty-message'>你的购物车空空如也 ... </p>")
        }
    },
    loadCartsProducts: function () {
        let _this = this
        // 发送请求, 获取数据
        api.getCartsProducts({
            success: function (result) {
                let data = result.data;
                // 渲染模板
                /*
                if (data.cartList.length > 0) {
                    let html = _util.render(cartsTpl, data)
                    _this.$cartBox.html(html)
                } else {
                    _this.$cartBox.html("<p class='empty-message'>你的购物车空空如也 ... </p>")
                }
                 */
                _this.renderCarts(data)
            },
            error: function () {
                _this.$cartBox.html("<p class='empty-message'>你找的页面走丢了 ... </p>")
            }
        })
    }
}

$(function () {
    page.init()
})
