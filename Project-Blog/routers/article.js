const express = require('express');
const router = express.Router();
const CategoryModel = require("../models/category");
const ArticleModel = require("../models/article");
const pagination = require("../util/pagination");
const multer  = require('multer');
// dest: 表示将图片等资源存储在哪个文件夹中
const upload = multer({ dest: 'public/uploads/' });


// 权限验证
router.use((req, res, next) => {
    if (req.userInfo.isAdmin) {
        next();
    }else {
        res.send("<h1>请求地址出错啦</h1>")
    }
});

// 显示文章列表中心首页
router.get("/", (req, res) => {
    /*
    let options = {
        page: parseInt(req.query.page),
        model: ArticleModel,
        query: {},
        projections: "-__v",
        sort: {_id: 1},
        populates: [
            {path: 'user', select: 'username'},
            {path: "category", select: "name"}
        ]
    };
    pagination(options)
        .then(result => {
            res.render('admin/article_list', {
                userInfo: req.userInfo,
                users: result.users,
                page: result.page,
                list: result.list,
                pages: result.pages
            });
            // console.log(result);
        })
        .catch(err => {
            res.send({
                code: 10,
                message: "数据查找失败"
            })
        })
    */
    ArticleModel.getPaginationDate(req)
        .then(result => {
            res.render('admin/article_list', {
                userInfo: req.userInfo,
                users: result.users,
                page: result.page,
                list: result.list,
                pages: result.pages
            });
        })

});

// 显示新增文章中心
router.get("/add", (req, res) => {
    CategoryModel.find({})
        .then(categories => {
            res.render('admin/article_add', {
                userInfo: req.userInfo,
                categories
            });
        })
        .catch(err => {
            res.render('admin/err', {
                userInfo: req.userInfo,
                message: "数据库操作失败",
                url: "/article"
            });
        })
});

// 处理新增文章数据
router.post("/add", (req, res) => {
    // 获取数据
    let { category, title, intro, content } = req.body;
    // 将数据插入数据库中
    // console.log(req.userInfo._id);
    ArticleModel.insertMany({
        category,
        title,
        intro,
        content,
        user: req.userInfo._id
    })
        .then(result => { // 数据插入成功
            res.render("admin/ok", {
                userInfo: req.userInfo,
                message: "新增文章成功",
                url: "/article"
            })
        })
        .catch(err => { // 数据插入失败
            res.send({
                userInfo: req.userInfo,
                message: "数据库操作失败, 请稍后再试",
                url: "/article"
            })
        })
});

// 处理上传图片数据
// upload.single('upload')
// upload 表示前台传递图片资源的字段名称 (在浏览器的Network中查看)
router.post("/uploadImg", upload.single('upload'), (req, res) => {
    // console.log(req.file);
    const FilePath = '/uploads/'+req.file.filename;
    res.json({
        uploaded:true,
        url:FilePath
    })
});

// 显示编辑文章中心
router.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    CategoryModel.find({})
        .then(categories => {
            ArticleModel.findById(id)
                .then(articles => {
                    res.render('admin/article_edit', {
                        userInfo: req.userInfo,
                        categories,
                        articles
                    });
                })
                .catch(err => {
                    res.render("admin/err", {
                        userInfo: req.userInfo,
                        message: "编辑文章失败",
                        url: "/article" // 返回分类文章首页
                    })
                });
        })
        .catch(err => {
            res.render("admin/err", {
                userInfo: req.userInfo,
                message: "数据库操作失败, 请稍后再试",
                url: "/article" // 返回分类文章首页
            })
        });
});

// 处理编辑文章数据
router.post("/edit", (req, res) => {
    // 获取数据
    let {category, title, intro, content, id} = req.body;
    // 查找数据库中的数据
    ArticleModel.updateOne({_id: id}, {category, title, intro, content})
        .then(data => {
            res.render("admin/ok", {
                userInfo: req.userInfo,
                message: "文章编辑完成",
                url: "/article"
            })
        })
        .catch(err => {
            res.render("admin/err", {
                userInfo: req.userInfo,
                message: "数据库操作失败, 请稍后再试!!!",
                url: "/article"
            })
        })
});

// 处理删除分类数据
router.get("/delete/:id", (req, res) => {
    // 获取数据
    const id = req.params.id;
    // 删除对应的数据
    ArticleModel.deleteOne({_id: id})
        .then(article => {
            res.render("admin/ok", {
                userInfo: req.userInfo,
                message: "删除成功",
                url: "/article"
            })
        })
        .catch(err => {
            res.render("admin/err", {
                userInfo: req.userInfo,
                message: "数据库操作失败, 请稍后再试!!!",
                url: "/article"
            })
        })
});

module.exports = router;