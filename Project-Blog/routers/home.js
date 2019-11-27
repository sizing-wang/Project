const express = require('express');
const router = express.Router();
const UserModel = require("../models/user");
const CommentModel = require("../models/comment");
const pagination = require("../util/pagination");
const hmac = require("../util/hmac");

// 权限验证
router.use((req, res, next) => {
    if (req.userInfo._id) {
        next();
    }else {
        res.send("<h1>请登录后, 再访问</h1>")
    }
});


// 显示个人用户中心
router.get("/", (req, res) => {
    res.render('home/index', {
    userInfo: req.userInfo
    });
});

// 显示评论管理中心
router.get("/comment", (req, res) => {
    CommentModel.getPaginationDate(req, {user: req.userInfo._id.toString()})
        .then(comments => {
            // console.log(comments);
            res.render("home/comment_list", {
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
            res.render("home/ok", {
                userInfo: req.userInfo,
                message: "评论删除成功",
                url: "/home/comment"
            })
        })
        .catch(err => {
            res.render("home/err", {
                userInfo: req.userInfo,
                message: "评论删除失败",
                url: "/home/comment"
            })
        })
});

// 显示修改密码中心
router.get("/password", (req, res) => {
    res.render("home/password", {
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
            res.render("home/ok", {
                userInfo: req.userInfo,
                message: "密码修改成功",
                url: "/"
            })
        })
        .catch(err => {
            res.render("home/err", {
                userInfo: req.userInfo,
                message: "密码修改失败, 请稍后再试!!!",
                url: "/"
            })
        })
});

module.exports = router;