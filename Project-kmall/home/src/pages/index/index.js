require("./index.css")
require("../common/footer/index")
require("../common/nav/index")
require("../common/search/index")
let api = require('api')
let _util = require("util")
let tpl = require("./sideCategories.tpl")
import Swiper from "swiper"
import "node_modules/swiper/css/swiper.min.css"

let page = {
    init: function () {
        this.loadSideList(),
        this.loadSwiper()
    },
    loadSideList: function () {
        // 发送ajax请求, 获取列表数据
        api.getHomeCategories({
            success: function (data) {
                // console.log(data);
                let categories = data.data
                let html = _util.render(tpl, {
                    categories
                })
                $(".categories").html(html)
            },
            error: function (msg) {
                alert(msg)
            }
        })
    },
    loadSwiper: function () {
        var mySwiper = new Swiper ('.swiper-container', {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: true,
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          }) 
    }
}

$(function () {
    page.init()
})
