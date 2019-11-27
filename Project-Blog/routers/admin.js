const express = require('express');
const router = express.Router();
const UserModel = require("../models/user");
const CommentModel = require("../models/comment");
const pagination = require("../util/pagination");
const hmac = require("../util/hmac");


router.use((req, res, next) => {
    if (req.userInfo.isAdmin) {
        next();
    }else {
        res.send("<h1>请求地址出错啦</h1>")
    }
});


// 显示管理员中心
router.get("/", (req, res) => {
    res.render('admin/index', {
    userInfo: req.userInfo
    });
});

// 显示用户列表中心
router.get("/user_list", (req, res) => {
    /*
    分页功能逻辑分析:
    1. 需要获取前台传入的页码
    2. 限制每页显示多少条数据 比如限制: 每页显示2条
    规律:
    第一页: 显示第1和2条  skip: (1-1)*2   limit: 2
    第二页: 显示第3和4条  skip: (2-1)*2   limit: 2
    第三页: 显示第5和6条  skip: (3-1)*2   limit: 2
    ......
    第page页  显示第 skip: (page-1)*2  limit: 2
    公式: (要显示的第几页-1)*跳过的多少数据  limit: 限制多少条数据
    */
    /*
    const limit = 2; // 限制显示的数据
    let page = parseInt(req.query.page); // 获取想要显示的第几页
    // 容错处理
    if (isNaN(page)) {
        page = 1
    }
    // 上一页边界控制
    if (page === 0) {
        page = 1
    }
    UserModel.countDocuments((err, count) => {
        let list = [];
        let pages = Math.ceil(count / 2);
        if (page > pages) { // 下一页的边界控制
            page = pages;
        }
        for (let i = 1; i <= pages; i++) {
            list.push(i);
        }
        let skip = (page-1)*limit; // 获取跳过多少条数据
        UserModel.find({}, "-password -__v")
            .sort({_id: -1})
            .skip(skip)
            .limit(limit)
            .then(user => {
                res.render('admin/user_list', {
                    userInfo: req.userInfo,
                    users: user,
                    page: page,
                    list: list,
                    pages: pages
                });
            })
            .catch(err => {
                res.send({
                    code: 10,
                    message: "用户查找失败"
                })
            })
    });
     */
    let options = {
        page: parseInt(req.query.page),
        model: UserModel,
        query: {},
        projections: "-password -__v",
        sort: {_id: -1}
    };
    pagination(options)
        .then(result => {
            res.render('admin/user_list', {
                userInfo: req.userInfo,
                users: result.users,
                page: result.page,
                list: result.list,
                pages: result.pages
            });
        })
        .catch(err => {
            res.send({
                code: 10,
                message: "用户查找失败"
            })
        })
});

// 显示评论管理中心
router.get("/comment", (req, res) => {
    CommentModel.getPaginationDate(req)
        .then(comments => {
            // console.log(comments);
            res.render("admin/comment_list", {
                userInfo: req.userInfo,
                comments: comments.users,
                // 返回分页数据
                page: comments.page,
                pages: comments.pages,
                list: comments.list
            })
        })
        .catch(err => {
            console.log(err);
        })

});

// 处理评论删除数据
router.get("/comment/delete/:id", (req, res) => {
    let id = req.params.id;
    CommentModel.deleteOne({_id: id})
        .then(data => {
            res.render("admin/ok", {
                userInfo: req.userInfo,
                message: "评论删除成功",
                url: "/admin/comment"
            })
        })
        .catch(err => {
            res.render("admin/err", {
                userInfo: req.userInfo,
                message: "评论删除失败",
                url: "/admin/comment"
            })
        })
});

// 显示修改密码中心
router.get("/password", (req, res) => {
    res.render("admin/password", {
        userInfo: req.userInfo
    })
});

// 处理修改密码数据
router.post("/password", (req, res) => {
    const id = req.userInfo._id;
    // 获取数据
    const { password } = req.body;
    // 在数据库中更新数据
    UserModel.updateOne({_id: id}, {password: hmac(password)})
        .then(data => {
            // 清除cession 信息
            req.session.destroy();
            res.render("admin/ok", {
                userInfo: req.userInfo,
                message: "密码修改成功",
                url: "/"
            })
        })
        .catch(err => {
            res.render("admin/err", {
                userInfo: req.userInfo,
                message: "密码修改失败, 请稍后再试!!!",
                url: "/"
            })
        })
});

module.exports = router;