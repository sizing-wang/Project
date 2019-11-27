const express = require('express');
const router = express.Router();
const CategoryModel = require("../models/category");
const ArticleModel = require("../models/article");
const CommentModel = require("../models/comment");

// 从后台获取共同数据
async function getCommonDate () {
    // 获取分类名称
    const getCategoryDate = CategoryModel.find({}, "name").sort({order: 1});
    // 获取点击排行中的文章数据
    const getTopArticleDate = ArticleModel.find({}, "title click").sort({_id: 1}).limit(10);
    const categories = await getCategoryDate;
    const topArticles = await getTopArticleDate;
    return {
        categories,
        topArticles
    }
}

// 显示首页
router.get("/", (req, res) => {
    ArticleModel.getPaginationDate(req)
        .then(result => {
            getCommonDate()
                .then(data => {
                    const { categories, topArticles } = data;
                    res.render('main/index', {
                        userInfo: req.userInfo,
                        categories,
                        topArticles,
                        // 返回分页器数据
                        articles: result.users,
                        page: result.page,
                        list: result.list,
                        pages: result.pages,
                        url: "/"
                    });
                })
        })
});


// 显示列表首页
router.get("/list/:id", (req, res) => {
    const id = req.params.id;
    ArticleModel.getPaginationDate(req, {category: id})
        .then(result => {
            getCommonDate()
                .then(data => {
                    const { categories, topArticles } = data;
                    res.render('main/list', {
                        userInfo: req.userInfo,
                        categories,
                        topArticles,
                        // 返回分页器数据
                        articles: result.users,
                        page: result.page,
                        list: result.list,
                        pages: result.pages,
                        // 分类id的回传
                        currentCategoryId: id
                    });
                });
        });
});

// 获取详情页数据
async function getArticleDate (req) {
    const id = req.params.id;
    // 获取共同数据
    let getCommonsDate = getCommonDate();
    // 获取当前对应文章数据
    let getArticleDate = ArticleModel.findOneAndUpdate({_id:id}, {$inc:{click:1}}, {new:true})
        .populate({path: "user", select: "username"})
        .populate({path: "category", select: "name"});
    // 获取当前文章对应评论信息
    let getCommentsDate = CommentModel.getPaginationDate(req, {article: id});
    // 为了保证点击量的准确性, 需要先获取文章数据, 再获取点击量数据
    let ArticleDate = await getArticleDate;
    let commonDate = await getCommonsDate;
    let commentsData = await getCommentsDate;
    let { categories, topArticles } = commonDate;
    return {
        categories,
        topArticles,
        ArticleDate,
        commentsData,
    }
}

// 显示详情页
router.get("/detail/:id", (req, res) => {
    getArticleDate(req)
        .then(data => {
            let { categories, topArticles, ArticleDate, commentsData } = data;

            res.render('main/detail', {
                userInfo: req.userInfo,
                categories,
                topArticles,
                ArticleDate,
                // 分类id的回传
                currentCategoryId: ArticleDate.category._id.toString(),
                commentsData: commentsData.users,
                // 返回分页器数据
                page: commentsData.page,
                list: commentsData.list,
                pages: commentsData.pages,

            });
        });
});

// 处理首页文章分页ajax请求
router.get("/articles", (req, res) => {
    const id = req.query.id;
    let query = {};
    if (id) {
        query.category = id
    }
    ArticleModel.getPaginationDate(req, query)
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