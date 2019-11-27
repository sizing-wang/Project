
const hmac = require("../util/hmac");
const express = require('express');
const UserModel = require("../models/user");
const router = express.Router();

// 处理注册用户
router.post("/register", (req, res) => {
    // 获取数据
    let { username, password } = req.body;
    // 查找数据库中有没有同名用户
    UserModel.findOne({username:username})
        .then(user => {
            // 判断数据库中有没有同名用户
            // 1. 有同名用户
            if (user) { // 该用户已经注册, 不能注册
                res.json({
                    code: 10,
                    message: "该用户已存在, 不能注册"
                })
            }else { // 2. 没有同名用户, 该用户不存在, 可以注册
            // 将数据插入数据库中
                UserModel.insertMany({
                    username: username,
                    password: hmac(password),
                    // isAdmin: true
                })
                    .then(user => {
                        res.json({
                            code: 0,
                            message: "数据插入成功",
                            data: user
                        })
                    })
                    .catch(err => {
                        res.json({
                            code: 10,
                            message: "数据插入失败",
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                code: 10,
                message: "数据查找失败"
            })
        })



});

// 处理登录用户
router.post("/login", (req, res) => {
    // 获取数据
    let { username,password } = req.body;
    // 查找数据库中有没有同名用户 // 忽略密码
    UserModel.findOne({username:username, password: hmac(password)}, "-password")
        .then(user => {
            // 判断数据库中有没有同名用户
            // 1. 有同名用户
            if (user) { // 该用户已经注册, 可以登录
                // 设置cookie信息, 设置的值必须是一个字符串, 也可以设置过期时间
                // req.cookies.set("userInfo", JSON.stringify(user), {maxAge:1000*60*60*24});

                // 使用session设置cookie信息 // 值可以是对象
                req.session.userInfo = user;
                res.json({
                    code: 0,
                    message: "该用户已经注册, 可以登录",
                    data: user
                });
            }else { // 2. 没有同名用户, 用户名或密码不正确
                res.json({
                    code: 10,
                    message: "用户名或密码不正确"
                })
            }
        })
        .catch(err => {
            res.json({
                code: 10,
                message: "数据查找失败"
            })
        })

});

// 处理退出用户
router.get("/logout", (req, res) => {
    // 清除cookie
    // req.cookies.set('userInfo',null);
    // 清除cession
    req.session.destroy();
    res.json({
        code: 0,
        message: "退出成功"
    })
});


module.exports = router;