// 引入mongoose模块
const mongoose = require('mongoose');

// 定义文档类型
const CategorySchema = new mongoose.Schema({
    // 内置验证
    name: {
        type: String,
        required: [true, "请必须输入分类名"],
    },
    order: {
        type: Number,
        default: 0
    }
});



const CategoryModel = mongoose.model("category", CategorySchema);
module.exports = CategoryModel;