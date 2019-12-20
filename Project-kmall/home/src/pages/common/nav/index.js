require("./idnex.css")
require("../../common/index")

let api = require("api")
let _util = require("util")

let page = {
    init: function () {
        this.loadUsername()
        this.bindEvent()
        return this
    },
    bindEvent: function() {
        $('#logout').on("click", function () {
            api.logout({
                success: function () {
                    _util.goLogIn()
                },
                error: function (msg) {
                    _util.showErrorMsg(msg)
                }
            })
        })
    },
    loadUsername: function () {
        api.getUsername({
            success: function (result) {
                let username = result.data.username
                $(".not-login").hide()
                $('.login')
                    .show()
                    .find(".username")
                    .text(username)
            }
        })
    }
}
$(function () {
    page.init()
})

