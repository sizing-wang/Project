require("./index.css")
require("../common/nav/index")
require("../common/search/index")
require("../common/footer/index")
let _util = require("util")
let api = require("api/")
let detailTpl = require("./index.tpl")

let page = {
    getDetailParams: { // 获取地址栏中的参数信息
        id: _util.getParamsFromUrl("productId")
    },
    init: function () {
        this.$detailBox = $(".detail-box");
        // 加载商品详情
        this.loadProductDetail();
        // 监听事件
        this.bindEvent()
    },
    bindEvent: function () {
        let t = 0;
        let l = 0;
        let _this = this;
        // 事件代理, 监听事件
        // 切换商品图片
        this.$detailBox.on("mouseenter", ".product-small-img-item", function () {
            let $this = $(this)
            // 添加选中样式
            $this.addClass("active")
                .siblings(".product-small-img-item")
                .removeClass("active")
            // 获取当前选中图片的地址
            let imageUrl = $this.find("img").attr("src")
            $(".product-main-img>img").attr("src", imageUrl)
            $(".lImg>img").attr("src", imageUrl)
        })
        // 处理商品图片放大镜效果
        this.$detailBox.on("mousemove", ".product-main-img", function (ev) {
            let $mask = $(".mask");
            let $productImg = $(".product-img");
            $mask.show();
            t = ev.clientY - $mask.height() / 2 - $productImg.offset().top;
            l = ev.clientX - $mask.width() / 2 - $productImg.offset().left;
            if (t < 0) {
                t = 0
            } else if (t >= ($(".product-img").height() - $(".mask").height())) {
                t = $(".product-img").height() - $(".mask").height();
            }
            if (l < 0) {
                l = 0
            } else if (l >= ($(".product-img").width() - $(".mask").width())) {
                l = $(".product-img").width() - $(".mask").width();
            }
            $mask.css({"top": t, "left": l});
            $(".lImg").show();
            let scaleX = l / $productImg.width();
            let scaleY = t / $productImg.height();
            let lImgX = ($(".lImg").width() - $(".lImg img").width()) * scaleX * 2 + "px";
            let lImgY = ($(".lImg").height() - $(".lImg img").height()) * scaleY * 2 + "px";
            $(".lImg img").css({"top": lImgY, "left": lImgX})
        })
        this.$detailBox.on("mouseleave", ".product-main-img", function () {
            $(".mask").hide();
            $(".lImg").hide();

        })
        // 处理增加/减少商品数量
        this.$detailBox.on("click", ".count-btn", function () {
            let $this = $(this)
            let $input = _this.$detailBox.find(".count-input")
            let currentVal = parseInt($input.val())
            // 增加
            if ($this.hasClass("plus")) {
                $input.val(currentVal + 1 > _this.stock ? _this.stock : currentVal + 1)
            } else { // 减少
                $input.val(currentVal - 1 < 1 ? 1 : currentVal - 1)
            }
        })
        // 处理添加购物车
        this.$detailBox.on("click", ".add-cart-btn", function () {
            let count = _this.$detailBox.find(".count-input").val()
            api.addCarts({
                data: {
                    productId : _this.getDetailParams.id,
                    count: count
                },
                success: function () {
                    // window.location.href = "/result.html?type=addCart"
                    _util.goResult("addCart")
                }
            })
        })

    },
    loadProductDetail: function () {
        let _this = this
        if (!this.getDetailParams.id) {
            return
        }
        // 发送请求, 获取数据
        api.getProductsDetail({
            data: _this.getDetailParams,
            success: function (product) {
                let data = product.data
                _this.stock = data.stock // 存储商品库存
                data.images = data.images.split(",")
                data.activeImage = data.images[0]
                let html = _util.render(detailTpl, data)
                _this.$detailBox.html(html)
            }
        })
    }
}

$(function () {
    page.init()
})
