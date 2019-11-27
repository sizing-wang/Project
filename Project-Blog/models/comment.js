// 引入mongoose模块
const mongoose = require('mongoose');
const moment = require("moment");
const pagination = require("../util/pagination");


// 定义文档类型
const CommentSchema = new mongoose.Schema({
    // 内置验证
    content: {
        type: String,
        required: [true, "请必须输入评论内容"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "article"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// 创建虚拟属性, 获取格式化之后的时间
CommentSchema.virtual("createTime").get(function () {
    // return this.createdAt.toLocaleString();
    return moment(this.createdAt).format("YYYY - MM - DD HH - mm - ss ")
});

// 定义分页静态方法
CommentSchema.statics.getPaginationDate = function (req, query = {}) {
    const options = {
        page: parseInt(req.query.page),
        model: CommentModel,
        query: query,
        projections: "-__v",
        sort: {_id: -1},
        populates: [
            {path: 'user', select: 'username'},
            {path: "article", select: "title"}
        ]
    };
    return pagination(options);
};

const CommentModel = mongoose.model("comment", CommentSchema);
module.exports = CommentModel;