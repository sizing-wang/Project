const express = require('express');
const router = express.Router();
const CategoryModel = require("../models/category");
const pagination = require("../util/pagination");

// 权限验证
router.use((req, res, next) => {
    if (req.userInfo.isAdmin) {
        next();
    }else {
        res.send("<h1>请求地址出错啦</h1>")
    }
});

// 显示分类管理中心首页
router.get("/", (req, res) => {
    let options = {
        page: parseInt(req.query.page),
        model: CategoryModel,
        query: {},
        projections: "-__v",
        sort: {order: 1}
    };
    pagination(options)
        .then(result => {
            res.render('admin/category_list', {
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
                message: "数据查找失败"
            })
        })

});

// 显示新增分类中心
router.get("/add", (req, res) => {
    res.render('admin/category_add_edit', {
        userInfo: req.userInfo
    });
});

// 处理新增分类数据
router.post("/add", (req, res) => {
    // 获取数据
    let { name,order } = req.body;
    if (!order) {
        order = 0
    }
    // 查找数据,并将数据插入数据库中
    CategoryModel.findOne({name})
        .then(data => {
            if (data) { // 分类名称已存在, 不能插入数据
                res.render("admin/err", {
                    userInfo: req.userInfo,
                    message: "分类名称已存在, 不能插入数据",
                    url: "/category"
                })
            }else { // 分类名称不存在, 能插入数据
                CategoryModel.insertMany({name, order})
                    .then(result => { // 数据插入成功
                        res.render("admin/ok", {
                            userInfo: req.userInfo,
                            message: "新增分类成功",
                            url: "/category"
                        })
                    })
                    .catch(err => { // 数据插入失败
                        res.send({
                            message: "数据库操作失败, 请稍后再试"
                        })
                    })
            }
        })
        .catch(err => {
            res.send({
                message: "数据查找失败, 请稍后再试"
            })
        })
});

// 显示编辑分类中心
router.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    CategoryModel.findById(id)
        .then(category => {
            res.render('admin/category_add_edit', {
                userInfo: req.userInfo,
                category
            });
        })
        .catch(err => {
            res.render("admin/err", {
                userInfo: req.userInfo,
                message: "新增分类失败",
                url: "/category" // 返回分类管理首页
            })
        });


});

// 处理编辑分类数据
router.post("/edit", (req, res) => {
    // 获取数据
    let { name, order, id} = req.body;
    if (!order) {
        order = 0;
    }
    // 查找数据库中的数据
    CategoryModel.findById(id)
        .then(category => { // 判断当前数据的合法性, 并重新编辑(更新)
            if (category.name == name && category.order == order) {
                // 改数据未修改, 不能重新编辑数据
                res.render("admin/err", {
                    userInfo: req.userInfo,
                    message: "该分类未修改, 不能重新编辑分类",
                    url: "/category"
                })
            } else { // 重新查找数据, 进一步验证数据的合法性     // $ne: 不等于
                CategoryModel.findOne({name: name, _id: {$ne: id}})
                    .then(category => {
                        if (category) { // 分类名称已存在, 不能编辑分类
                            res.render("admin/err", {
                                userInfo: req.userInfo,
                                message: "分类名称已存在, 请换一个",
                                url: "/category"
                            })
                        } else { // 分类名称不存在, 可以编辑分类
                            CategoryModel.updateOne({_id: id}, {name, order})
                                .then(data => {
                                    res.render("admin/ok", {
                                        userInfo: req.userInfo,
                                        message: "分类编辑完成",
                                        url: "/category"
                                    })
                                })
                                .catch(err => {
                                    res.render("admin/err", {
                                        userInfo: req.userInfo,
                                        message: "数据库操作失败, 请稍后再试!!!",
                                        url: "/category"
                                    })
                                })
                        }
                    })
                    .catch(err => {
                        res.render("admin/err", {
                            userInfo: req.userInfo,
                            message: "数据库操作失败, 请稍后再试!!!",
                            url: "/category"
                        })
                    })
            }
        })
        .catch(err => {
            res.render("admin/err", {
                userInfo: req.userInfo,
                message: "数据库操作失败, 请稍后再试!!!",
                url: "/category"
            })
        })
});

// 处理删除分类数据
router.get("/delete/:id", (req, res) => {
    // 获取数据
    const id = req.params.id;
    // 删除对应的数据
    CategoryModel.deleteOne({_id: id})
        .then(category => {
            res.render("admin/ok", {
                userInfo: req.userInfo,
                message: "删除成功",
                url: "/category"
            })
        })
        .catch(err => {
            res.render("admin/err", {
                userInfo: req.userInfo,
                message: "数据库操作失败, 请稍后再试!!!",
                url: "/category"
            })
        })
});

module.exports = router;