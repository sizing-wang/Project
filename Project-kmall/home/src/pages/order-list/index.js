require("./index.css")
require("../common/nav/index")
require("../common/search/index")
require("../common/footer/index")
require("util/pagination/index")
let _util = require("util")
let api = require("api/")
let tpl = require("./index.tpl")
let _side = require("../common/side/index")


let page = {
    getOrderListParams: { // 获取地址栏中的参数信息
        page: _util.getParamsFromUrl("page") || 1,
        orderNo: _util.getParamsFromUrl("orderNo") || ""
    },
    init: function () {
        this.$paginationBox = $(".pagination-box")
        // 加载侧边栏
        this.loadSideList()
        // 初始化分页组件
        this.initPagination()
        // 加载订单列表数据
        this.loadOrderListData()
    },
    loadSideList: function () {
        _side.render("order-list")
    },
    initPagination: function () {
          let _this = this
          this.$paginationBox.pagination()
           // 自定义事件, 获取数据
          this.$paginationBox.on("page-change", function (ev, page) {
              // 更改参数
              _this.getOrderListParams.page = page
              // 发送请求
              _this.loadOrderListData()
          })
    },
    loadOrderListData: function () {
        let _this = this
        // 根据获取的参数信息, 向后台请求数据
        api.getOrderList({
            data: _this.getOrderListParams,
            success: function (result) {
                // console.log("::::::", result);
                let data = result.data;
                // console.log(data);
                // return
                if (data.list.length > 0) {
                    // 处理订单创建的时间格式
                    data.list.forEach(function (order) {
                        order.createdAt = new Date(order.createdAt).toLocaleString()
                    })
                        // 渲染模板
                        let html = _util.render(tpl, {
                            list: data.list
                        })
                        $(".order-box").html(html)
                        // 构建分页器
                        // console.log(data);
                        _this.$paginationBox.pagination("render", {
                            current: data.current,
                            total: data.total,
                            pageSize: data.pageSize
                        })

                    } else {
                        $(".order-box").html("<p class='empty-message'>还没有商品订单哦......</p>")
                    }
            }
        })
    }
}

$(function () {
    page.init()
})
