// 引入mongoose模块
const mongoose = require('mongoose');
const moment = require("moment");
const pagination = require("../util/pagination");


// 定义文档类型
const ArticleSchema = new mongoose.Schema({
    // 内置验证
    title: {
        type: String,
        required: [true, "请必须输入文章名称"],
    },
    intro: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    click: {
        type: Number,
        default: 0
    },
    content: {
        type: String
    }
});

// 创建虚拟属性, 获取格式化之后的时间
ArticleSchema.virtual("createTime").get(function () {
    // return this.createdAt.toLocaleString();
    return moment(this.createdAt).format("YYYY - MM - DD HH - mm - ss ")
});

// 定义分页静态方法
ArticleSchema.statics.getPaginationDate = function (req, query = {}) {
    const options = {
        page: parseInt(req.query.page),
        model: ArticleModel,
        query: query,
        projections: "-__v",
        sort: {_id: 1},
        populates: [
            {path: 'user', select: 'username'},
            {path: "category", select: "name"}
        ]
    };
    return pagination(options);
};

const ArticleModel = mongoose.model("article", ArticleSchema);
module.exports = ArticleModel;