require("./index.css")
let paginationTpl = require("./index.tpl")
let _util = require("util")


;(function ($) {
    function Pagination ($elem) {
        this.$elem = $elem
        this.bindEvent()
    }
    Pagination.prototype = {
        constructor: Pagination,
        bindEvent: function () {
            let _this = this
            this.$elem.on("click", ".page-item", function () {
                let $this = $(this)
                if ($this.hasClass("disabled") || $this.hasClass("active")) {
                    return
                }
                // 获取页码
                let page = $this.data("value")
                _this.$elem.trigger("page-change", page)
            })
        },
        render: function (options) {
            // 获取数据
            let current = options.current;
            let pageSize = options.pageSize;
            let total = options.total;
            // 计算总页数
            let pages = Math.ceil(total / pageSize);
            // 计算上一页/下一页
            let prev = current - 1;
            let next = current + 1;
            // 生成页码数据
            let pageArray = [];
            pageArray.push({
                name: "上一页",
                value: prev,
                disable: current > 1 ? false : true
            });
            // 规定显示的页码数
            let start = current - options.range < 1 ? 1 : current - options.range;
            let end = current + options.range > pages ? pages : current + options.range;
            for (let i = start; i <= end; i++) {
                pageArray.push({
                    name: i,
                    value: i,
                    active: current == i ? true : false
                })
            }
            pageArray.push({
                name: "下一页",
                value: next,
                disable: current < pages ? false : true
            });
            let html = _util.render(paginationTpl, {
                pageArray: pageArray,
                current: current,
                pages: pages
            })
            this.$elem.html(html)
        }
    }
    Pagination.DEFAULT = {
        range: 3
    }
    $.fn.extend({
        pagination: function (fn, options) {
            // console.log(this) // this 为一个jQuery对象
            return this.each(function () {
                let $this = $(this) // 将取出的dom节点转换成jQuery对象
                let pagination = $this.data("pagination")
                // 判断当前组件有没有被初始化, 如果没有初始化, 就初始化, 并且最好只能初始化一次
                // 如果已经初始化了, 就直接可以调用组件内的方法 (单例模式)
                if (!pagination) {
                    pagination = new Pagination($this)
                    $this.data("pagination", pagination)
                }
                // 将外部传入的参数, 与内部的参数进行合并
                options = $.extend({}, Pagination.DEFAULT, options)
                // 判断,外部调用组件内部实例上的方法时, 传入的值, 是不是一个函数, 如果是, 就调用, 否则,相反
                if (typeof pagination[fn] == "function") {
                    pagination[fn](options)
                }

            })
        }
    })
})(jQuery)