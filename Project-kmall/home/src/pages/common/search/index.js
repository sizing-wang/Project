require("./index.css");

const page = {
    init: function () {
        this.bindEvent()
    },
    bindEvent: function (ev) {
        let $this = this;
        $("#btn-search").on("click", function () {
            $this.submit()
        });
        $("#btn-search").on("keyup", function (ev) {
            if (ev.keyCode === 13) {
                $this.submit()
            }
        })

    },
    submit: function () {
       var keyword = $(".search-input").val().trim();
       window.location.href = "/list.html?keyword=" + keyword
    }

}


$(function () {
    page.init()
})
