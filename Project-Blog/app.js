// 引入 express包
const express = require('express');
const app = express();
// 引入swig模板
const swig = require("swig");
// 引入body-parser中间件
const bodyParser = require("body-parser");
// 引入cookie-parser包
const Cookies = require("cookies");
// 引入express-session包
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
// 处理静态资源
app.use(express.static('public'));

/***********************配置body-parser中间件*******************/
// 借助body-parser处理中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


/*************************配置mongoose数据库***********************/
// 引入mongoose模块
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
// 创建一个Connection对象,能够操作数据库，但是不能操作具体的document(文档)
const db = mongoose.connection;
db.on('error', (err) => { // 数据库连接失败
    console.log("connect mongodb err ... ");
    throw err; // 抛出错误
});
db.once('open', () => { // 数据库连接成功
    console.log("connect mongodb success ... ");

});

/****************************配置swig模板**************************/
// 使用swig模板步骤 :
// 1.设置缓存
// 开发阶段设置不走缓存
swig.setDefaults({
    cache: false
});
// 2.配置应用模板
// 第一个参数是模板名称,同时也是模板文件的扩展名
// 第二个参数是解析模板的方法(固定)
app.engine('html', swig.renderFile);
// 3.配置模板的存放目录
// 第一参数必须是views (固定)
// 第二个参数是模板存放的目录
app.set('views', './views');
// 4.注册模板引擎
// 第一个参数必须是view engine (固定)
// 第二个参数是模板名称,也就是app.engine的第一个参数
app.set('view engine', 'html');

/*********************利用中间件配置cookies信息**********************/
/*
app.use((req, res, next) => {
    // 生成cookies对象, 并保存在req中
    req.cookies = new Cookies(req,res);
    let userInfo = {};
    if (req.cookies.get("userInfo")) {
        userInfo = JSON.parse(req.cookies.get("userInfo"));
    }
    req.userInfo = userInfo;
    next();
});
*/
/************************利用中间件配置session+cookies信息************************/
app.use(session({
    //设置cookie名称
    name:'blogId',
    //用它来对session cookie签名，防止篡改
    secret:'abc',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true,
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use((req, res, next) => {
    req.userInfo = req.session.userInfo || {};
    next();
});

/************************* 配置路由 ************************/
app.use("/", require("./routers/index"));
app.use("/user", require("./routers/user"));
app.use("/admin", require("./routers/admin"));
app.use("/home", require("./routers/home"));
app.use("/category", require("./routers/category"));
app.use("/article", require("./routers/article"));
app.use("/comment", require("./routers/comment.js"));

app.listen(3000, () => console.log('server is running in the http://127.0.0.1/3000!'));