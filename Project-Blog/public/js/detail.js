(function ($) {
    $(".sub-comment").on("click", function () {
        // 获取输入框内容
        let val = $(".text-comment").val().trim();
        let $err = $(".comment .err");
        // 验证输入内容的合法性
        if (val === "") {
            $err.html("请输入内容后, 再发布");
            return
        } else {
            $err.html("");
        }
        // 限制评论的长度
        if (val.length > 100) {
            $err.html("评论内容不能超过10个字");
            return
        } else {
            $err.html("");
        }

        // 发送ajax请求
        const id = $(this).data("id"); // 获取对应文章id
        $.ajax({
            url: "/comment/add",
            type: "post",
            dataType: "json",
            data: {
                content: val,
                article: id
            }
        })
            .done(data => {
                if (data.code === 0) {
                    $(".text-comment").val(""); // 清空输入框
                    // TODO ...
                    // console.log("数据请求成功::", data);
                    $("#comment_page").trigger("get-data", data.comment)
                }
            })
            .fail(err => {
                console.log(err);
            })

    })
})(jQuery);