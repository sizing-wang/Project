(function ($) {
    $.fn.extend({
        pagination: function (option) {
            let $elem = this;
            $elem.on("click", "a", function () {
                let $this = $(this);
                // 1.获取当前页码
                let currentPage = $elem.find(".active a").html() * 1;
                // 2.根据当前页码计算下一页或上一页
                let labelText = $this.attr("aria-label");
                // 定义一个空页码
                let page = 0;
                if (labelText === "Next") {
                    page = currentPage + 1
                } else if (labelText === "Previous") {
                    page = currentPage - 1
                } else {
                    page = $this.html() * 1
                }
                // 如果点击的是当前页, 阻止点击行为
                if (page === currentPage) return false;
                let url = option.url + "?page=" + page;
                let id = $elem.data('id');
                if (id) {
                    url += "&id=" + id
                }
                // 3.发送ajax
                $.ajax({
                    url: url,
                    type: "get",
                    dataType: "json"
                })
                    .done(data => {
                        // console.log(data);
                        $elem.trigger("get-data", data.result);
                    })
                    .fail(err => {
                        console.log(err);
                    })
            })
        }
    })
})(jQuery);