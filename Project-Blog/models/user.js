// 引入mongoose模块
const mongoose = require('mongoose');

// 定义文档类型
const UserSchema = new mongoose.Schema({
    // 内置验证
    username: {
        type: String,
        required: [true, "请输入用户名"],
        maxlength: ["8", "最大不能超过五位字符"],
        minlength: ["3", "最小不能低于两位字符"]
    },
    password: {
        type: String,
        required: [true, "请输入密码"],
        max: ["6", "最大不能超过六位字符"],
        min: ["3", "最小不能超过三位字符"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});



const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;