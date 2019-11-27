(function ($) {
    $(".sub-password").on("click", function () {
        let $formPassword = $(".form-password");
        // 获取数据
        let password = $formPassword.find("[name='password']").val();
        let rePassword = $formPassword.find("[name='rePassword']").val();
        // 验证数据合法性
        // 密码是3-6位的任意字符
        let $err = $formPassword.find(".err");
        let pwdReg = /^\w{3,6}$/i;
        if (!pwdReg.test(password)) {
            $err.eq(0).html("密码是3-6位的任意字符");
            return false;
        } else {
            $err.eq(0).html("");
        }
        if (password !== rePassword) {
            $err.eq(1).html("两次密码输入不一样, 请再次输入");
            return false;
        } else {
            $err.eq(1).html("");
        }
    })

})(jQuery);