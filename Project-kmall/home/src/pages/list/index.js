require("./index.css")
require("../common/nav/index")
require("../common/search/index")
require("../common/footer/index")
require("util/pagination/index")
let _util = require("util/index")
let api = require("api/")

let tpl = require("./index.tpl")
let categoryListTpl = require("./category-list.tpl")


let page = {
    getListParams: { // 获取地址栏中的参数信息
        page: _util.getParamsFromUrl("page") || 1,
        category: _util.getParamsFromUrl("categoriesId"),
        keyword: _util.getParamsFromUrl("keyword"),
        orderBy: _util.getParamsFromUrl("orderBy") || "default",
        isAll: _util.getParamsFromUrl("isAll"),
        isHot: _util.getParamsFromUrl("isHot")
    },
    init: function () {
        this.$paginationBox = $(".pagination-box")
        // 初始化分页组件
        this.initPagination()
        // 加载分类列表
        this.loadCategoriesData();
        // 加载列表页数据
        this.loadListData()
        // 监听事件
        this.bindEvent()
    },
    initPagination: function () {
          let _this = this
          this.$paginationBox.pagination()
           // 自定义事件, 获取数据
          this.$paginationBox.on("page-change", function (ev, page) {
              // 更改参数
              _this.getListParams.page = page
              // 发送请求
              _this.loadListData()
          })
    },
    loadCategoriesData: function () {
        // 发送请求, 获取分类列表数据
        api.getCategoryList({
            success: function (result) {
                const categoryListData = result.data;
                // console.log("::::::::::::", categoryListData);
                if (result.code == 0) {
                    let html = _util.render(categoryListTpl, {
                        categoryListData
                    })
                    $(".category-list").html(html)
                } else {
                    alert("加载分类列表失败, 刷新再试 !")
                }
            },
            error: function (err) {
                alert(err)
            }
        })
    },
    bindEvent: function () {
        let _this = this;
        $(".sort-item").on("click", function () {
            let $this = $(this);
            // 默认排序
            if ($this.hasClass("default")) {
                if ($this.hasClass("active")) return
                $this.addClass("active")
                    .siblings(".sort-item")
                    .removeClass("active")
                    _this.getListParams.orderBy = "default"
                    _this.loadListData()
            }
            // 价钱排序
           else if ($this.hasClass("price")) {
                $this.addClass("active")
                    .siblings(".default")
                    .removeClass("active")
            }
           if ($this.hasClass("asc")) {
               $this.addClass("desc")
                   .removeClass("asc")
               _this.getListParams.orderBy = "price_desc"
               _this.loadListData()
           } else if ($this.hasClass("desc")) {
               $this.addClass("asc")
                   .removeClass("desc")
               _this.getListParams.orderBy = "price_asc"
               _this.loadListData()
           }
        })

        // 监听分类列表扩展和缩小 // 事件委托
        $(".category-list").on("click", ".icon", function () {
            const $this = $(this);
            if ($this.hasClass("fa-minus-square-o")) {
                $this.addClass("fa-plus-square-o").removeClass("fa-minus-square-o")
                $this.siblings("ul").hide();
            } else {
                $this.addClass("fa-minus-square-o").removeClass("fa-plus-square-o")
                $this.siblings("ul").show()
            }
        })

        // 监听子分类的点击事件 // 事件委托
        $(".category-list").on("click", ".son", function () {
            const $this = $(this);
            const categoryId = $this.data("id");
            if (categoryId) {
                $this.find("a").addClass("active");
                $this.parents().siblings().find("li a").removeClass("active")
            }
            _this.getListParams.category = categoryId;
            _this.loadListData()
        })

    },
    loadListData: function () {
        let _this = this;
        if (_this.getListParams.isAll == 1) {
            $(".nav-item .isAll").addClass("active")
        } else {
            $(".nav-item .isHot").addClass("active")
        }
        // 根据获取的参数信息, 向后台请求数据
        api.getListData({
            data: _this.getListParams,
            success: function (result) {
                // console.log("::::::", result);
                let data = result.data;
                    if (data.list.length > 0) {
                        // 渲染模板
                        let html = _util.render(tpl, {
                            list: data.list
                        })
                        $(".product-list-box").html(html)
                        // 构建分页器
                        // console.log(data);
                        _this.$paginationBox.pagination("render", {
                            current: data.current,
                            total: data.total,
                            pageSize: data.pageSize
                        })

                    } else {
                        $(".product-list-box").html("<p class='empty-message'>你搜索的商品不见了......</p>")
                    }
            }
        })
    }
}

$(function () {
    page.init()
})
