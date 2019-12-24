require("./index.css");
let tpl = require("./index.tpl")
let _util = require("util")

module.exports = {
    render: function (name) {
        let list = [
            {
                name: "user-center",
                link: "./user-center.html",
                desc: "个人中心"
            },
            {
                name: "order-list",
                link: "./order-list.html",
                desc: "我的订单"
            },
            {
                name: "user-update-password",
                link: "./user-update-password.html",
                desc: "修改密码"
            }
        ]
        list.find(function (item) {
            return item.name == name
        }).isActive = true;

        /*
        let template = Hogan.compile(tpl);
        let html = template.render({
            list: list
        });
        */
       
        let html = _util.render(tpl, {
            list
        })

       $(".side").html(html)
    }
}