
let $logOut = $("#logOut");
$logOut.on("click", function () {
    // 发送ajax请求
    $.ajax({
        url: "/user/logout",
        type: "GET"
    })
        .done(function (user) {
            console.log(user);
            if (user.code === 0) {
                // 返回首页
                window.location.href = "/";
            }
        })
        .fail(function (err) {
            $userInfo.find(".err").html("退出失败, 请稍后再试");
        })

});