(function ($) {
    // 注册和登录面板的切换
    let $register = $("#register");
    let $login = $("#login");
    let $userInfo = $(".user-info");
    // 登录 => 注册
    $("#linkLogon").on("click", function () {
        $login.hide();
        $register.show();
    });
    // 注册 => 登录
    $("#linkSign").on("click", function () {
        $register.hide();
        $login.show();
    });

    // 注册面板
    let $regSubmit = $(".logon_btn");
    $regSubmit.on("click", function () {
        // 验证输入数据合法性
        // 1.获取数据
        let username = $register.find(".username").val();
        let password = $register.find(".password").val();
        let rePassword = $register.find(".rePassword").val();
        // 2.验证数据
        let msgErr = $(".panel_err>.err");
        let msg = "";
        // 以/字母开头的包含字母数字下划线的3~8位字符
        let userReg = /^[a-z][a-z0-9_]{2,7}$/i; // 验证用户名
        // 密码是3-6位的任意字符
        let pwdReg = /^\w{3,6}$/i;
        if (!userReg.test(username)) {
            msg = "请以/字母/下划线开头的包含数字的3~6位字符";
            msgErr.html(msg);
        }else if (!pwdReg.test(password)) {
            msg = "请输入以密码是3-6位的任意字符";
            msgErr.html(msg);
        }else if (rePassword !== password) {
            msg = "两次密码输入不一致";
            msgErr.html(msg);
        }else {
            // 3.发送ajax请求
            $.ajax({
                url: "/user/register",
                type: "POST",
                dataType: "json",
                data: {
                    username,
                    password
                },
                success: function (data) {
                    $register.hide(); // 隐藏注册面板
                    $login.show(); // 显示登陆面板
                },
                error: function (err) {
                    alert(err.message);
                }
            });
            // 清空提示信息和输入框中内容
            msgErr.html("");
            $register.find(".username").val("");
            $register.find(".password").val("");
            $register.find(".rePassword").val("");
            alert("注册成功");
        }

    });

    // 登录面板
    let $loginBtn = $(".login_btn");
    $loginBtn.on("click", function () {
        // 验证输入数据合法性
        // 1.获取数据
        let username = $login.find(".username").val();
        let password = $login.find(".password").val();
        // 2.验证数据
        let msgErr = $(".panel_err>.err");
        let msg = "";
        // 以/字母开头的包含字母数字下划线的3~8位字符
        let userReg = /^[a-z][a-z0-9_]{2,7}$/i; // 验证用户名
        // 密码是3-6位的任意字符
        let pwdReg = /^\w{3,6}$/i; // 验证密码
        if (!userReg.test(username)) {
            msg = "请以/字母/下划线开头的包含数字的3~6位字符";
            msgErr.html(msg);
        }else if (!pwdReg.test(password)) {
            msg = "请输入以密码是3-6位的任意字符";
            msgErr.html(msg);
        }else {
            // 3.发送ajax请求
            $.ajax({
                url: "/user/login",
                type: "POST",
                dataType: "json",
                data: {
                    username,
                    password
                },
                success: function (data) {
                    if (data.code === 0) {
                        /*
                        $userInfo.find("span").html(data.data.username);
                        $login.hide(); // 登录面板隐藏
                        $userInfo.show(); // 个人信息面板显示
                         */
                        window.location.reload(); // 重新加载页面
                    }else {
                        msgErr.html(data.message);
                    }
                },
                error: function (err) {
                    console.log(err.message);
                }
            });
            // 清空提示信息和输入框中内容
            msgErr.html("");
            $login.find(".username").val("");
            $login.find(".password").val("");
        }

    });

    // 首页文章区分页功能
    let $articlePage = $("#article_page");
    function buildArticleHtml (articles) {
        let html = "";
        articles.forEach(function (article) {
            let createTime = moment(article.createTime).format("YYYY - MM - DD HH - mm - ss ");
            html += `
                <div class="info">
        <div class="info_top">
            <a href="/detail/${article._id.toString() }">
            <h3>${article.title}</h3>
            </a>
        </div>
        <div class="info_content">
            <p>${article.intro}</p>
        </div>
        <div class="info_bottom">
            <a href="javascript:">
                <span class="glyphicon glyphicon-user"></span>
                <span class="userName">${article.user.username}</span>
            </a>
            <a href="javascript:">
                <span class="glyphicon glyphicon-th-list"></span>
                <span class="userName">${article.category.name}</span>
            </a>
            <a href="javascript:">
                <span class="glyphicon glyphicon-time"></span>
                <span class="userName">${createTime}</span>
            </a>
            <a href="javascript:">
                <span class="glyphicon glyphicon-eye-open"></span>
                <span class="userName">${article.click}已阅读</span>
            </a>
        </div>
    </div>
            `
        });
        return html;
    }
    function buildPaginationHtml (page, pages, list) {
        let html = "";
        if (page === 1) {
            html += `<li class="disabled">`
        } else {
            html += `<li>`
        }
        html += `
            <a href="javascript:" aria-label="Previous" id="pre-link">
                <span aria-hidden="true">&laquo;</span>
            </a>
            </li>`;
        list.forEach(function (i) {
            if (i === page) {
                html += `<li class="active"><a href="javascript:">${ i }</a></li>`
            } else {
                html += `<li><a href="javascript:">${ i }</a></li>`
            }
        });
        if (page === pages) {
            html += `<li class="disabled">`
        } else {
            html += `<li>`
        }
        html += `
                <a href="javascript:" aria-label="Next" id="next_link">
                <span aria-hidden="true">&raquo;</span>
                </a>
            </li>`;
        return html;
    }
    $articlePage.on("get-data", function (ev, data) {
        // 获取首页文章数据
        // console.log(data);
        // 构建首页文章结构
        $("#article-wrap").html(buildArticleHtml(data.users));
        // 构建分页器结构
        if (data.pages > 1) {
            $(".pagination").html(buildPaginationHtml(data.page, data.pages, data.list));
        } else {
            $(".pagination").html("");
        }
    });
    $articlePage.pagination({
        url: "/articles"
    });

    // 详情页评论区分页功能
    let $commentPage = $("#comment_page");
    function buildCommentHtml (comments) {
        let html = "";
        comments.forEach(function (comment) {
            let createTime = moment(comment.createTime).format("YYYY - MM - DD HH - mm - ss ");
            html += `
                    <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">${ comment.user.username } 发布于 ${ createTime } </h3>
                    </div>
                    <div class="panel-body">
                        ${ comment.content }
                    </div>
                </div>`
        });
        return html
    }
    $commentPage.on("get-data", function (ev, data) {
        // 获取详情页评论数据
        // 构建评论信息结构
        $("#comment-wrap").html(buildCommentHtml(data.users));
        // 构建分页器结构
        let {page, pages, list} = data;
        let $commentPagination = $commentPage.find(".pagination");
        if (pages > 1) {
            $commentPagination.html(buildPaginationHtml(page, pages, list));
        } else {
            $commentPagination.html("");
        }
    });
    $commentPage.pagination({
        url: "/comment/list"
    })
})(jQuery);