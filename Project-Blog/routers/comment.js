const express = require('express');
const router = express.Router();
const CommentModel = require("../models/comment");
const pagination = require("../util/pagination");

router.use((req, res, next) => {
    if (req.userInfo._id) {
        next();
    }else {
        res.send("<h1>请登录后,再评论!!!</h1>")
    }
});


// 处理添加评论信息数据
router.post("/add", (req, res) => {
    // 获取数据
    let { content, article } = req.body;
    // 插入数据
    CommentModel.insertMany({
        content,
        article,
        user: req.userInfo._id.toString()
    })
        .then(data => {
            CommentModel.getPaginationDate(req, {article: article})
                .then(comment => {
                    res.json({
                        code: 0,
                        message: "评论成功",
                        comment: comment
                    })
                })
                .catch(err => {
                    res.json({
                        code: 10,
                        message: "评论失败"
                    })
                })
        })
        .catch(err => {
            res.json({
                code: 10,
                message: "数据库操作失败, 请稍后再试!!!",
                err: err
            })
        })
});

// 处理详情页评论分页ajax
router.get("/list", (req, res) => {
    const id = req.query.id;
    let query = {};
    if (id) {
        query.article = id
    }
    CommentModel.getPaginationDate(req, query)
        .then(result => {
            res.json({
                code: 0,
                message: "数据请求成功",
                result: result
            })
        })
        .catch(err => {
            console.log(err);
            res.json({
                code: 10,
                message: "获取数据失败"
            })
        })
});



module.exports = router;