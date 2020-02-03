require("./index.css")
require("../common/footer/index")
require("../common/nav/index")
require("../common/search/index")
let api = require('api')
let _util = require("util")
let tpl = require("./sideCategories.tpl")
let homeImgTpl = require("./homeImg.tpl")
let floorsTpl = require("./floors.tpl")
import Swiper from "swiper"
import "node_modules/swiper/css/swiper.min.css"

let page = {
    init: function () {
        this.loadSideList()
        this.loadSwiper()
        this.loadFloorData()
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

        // 发送ajax, 获取首页轮播图
        api.getHomeAdImages({
            data: {
                position: 1
            },
            success: function (result) {
                // console.log(":::::::::", result);
                let html = _util.render(homeImgTpl, {
                    slides: result.data
                })
                $(".swiper-container .swiper-wrapper").html(html)

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
        })
    },
    loadFloorData: function () {
        // 发送ajax, 获取楼层数据
        api.getFloorData({
            success: function (result) {
                // console.log("::::::::", result);
                let floors = result.data;
                let html = _util.render(floorsTpl, {
                    floors: floors
                })
                $(".floor .floor-wrap").html(html)
            },
            error: function (err) {
                alert(err)
            }
        })

    }
}

$(function () {
    page.init()
})
